/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.spring.springBatch.configuration;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.json.JSONObject;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.database.JdbcPagingItemReader;
import org.springframework.batch.item.database.Order;
import org.springframework.batch.item.database.support.MySqlPagingQueryProvider;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.batch.item.file.MultiResourceItemReader;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.support.ClassifierCompositeItemWriter;
import org.springframework.batch.item.support.CompositeItemProcessor;
import org.springframework.batch.item.support.CompositeItemWriter;
import org.springframework.batch.item.validator.ValidatingItemProcessor;
import org.springframework.batch.item.xml.StaxEventItemReader;
import org.springframework.batch.item.xml.StaxEventItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.oxm.xstream.XStreamMarshaller;

import com.spring.springBatch.domain.CustomerClassifier;
import com.spring.springBatch.domain.CustomerValidator;
import com.spring.springBatch.model.Customer;
import com.spring.springBatch.model.CustomerFieldSetMapper;
import com.spring.springBatch.model.CustomerLineAggregator;
import com.spring.springBatch.model.CustomerRowMapper;
import com.spring.springBatch.processor.CustomItemProcessor;
import com.spring.springBatch.reader.StatefulItemReader;
import com.spring.springBatch.reader.StatelessItemReader;
import com.spring.springBatch.util.CryptoHelperUtil;
import com.spring.springBatch.util.SignVerificationUtil;


/**
 * @author pgoel
 */
@Configuration
public class JobConfiguration {

	@Autowired
	private JobBuilderFactory jobBuilderFactory;

	@Autowired
	private StepBuilderFactory stepBuilderFactory;

	@Autowired
	public DataSource dataSource;

	@Value("classpath*:/data/customer*.csv")
	private Resource[] inputFiles;

	@Bean
	public MultiResourceItemReader<Customer> multiResourceItemReader() {
		// Wrapping the item reader and pass it to resources as resources read.
		MultiResourceItemReader<Customer> reader = new MultiResourceItemReader<>();

		reader.setDelegate(flatFileItemReader());
		reader.setResources(inputFiles);

		return reader;
	}

	@Bean
	public JdbcCursorItemReader<Customer> cursorItemReader() {
		JdbcCursorItemReader<Customer> reader = new JdbcCursorItemReader<>();

		reader.setSql("select id, firstName, lastName, birthdate from customer order by lastName, firstName");
		reader.setDataSource(this.dataSource);
		reader.setRowMapper(new CustomerRowMapper());

		return reader;
	}

	@Bean
	public JdbcPagingItemReader<Customer> pagingItemReader() {
		JdbcPagingItemReader<Customer> reader = new JdbcPagingItemReader<>();

		reader.setDataSource(this.dataSource);
		reader.setFetchSize(10);
		reader.setRowMapper(new CustomerRowMapper());

		MySqlPagingQueryProvider queryProvider = new MySqlPagingQueryProvider();
		queryProvider.setSelectClause("id, firstName, lastName, birthdate");
		queryProvider.setFromClause("from customer");

		Map<String, Order> sortKeys = new HashMap<>(1);

		sortKeys.put("id", Order.ASCENDING);

		queryProvider.setSortKeys(sortKeys);

		reader.setQueryProvider(queryProvider);

		return reader;
	}

	@Bean
	public FlatFileItemReader<Customer> flatFileItemReader() {
		FlatFileItemReader<Customer> reader = new FlatFileItemReader<>();

		reader.setLinesToSkip(1); // skip header
		reader.setResource(new ClassPathResource("/data/DataCustomer.csv"));

		DefaultLineMapper<Customer> customerLineMapper = new DefaultLineMapper<>();

		DelimitedLineTokenizer tokenizer = new DelimitedLineTokenizer();
		tokenizer.setNames(new String[] { "id", "firstName", "lastName", "birthdate" });

		customerLineMapper.setLineTokenizer(tokenizer);
		customerLineMapper.setFieldSetMapper(new CustomerFieldSetMapper());
		customerLineMapper.afterPropertiesSet();

		reader.setLineMapper(customerLineMapper);

		return reader;
	}

	@Bean
	public StaxEventItemReader<Customer> customXmlItemReader() {

		XStreamMarshaller unmarshaller = new XStreamMarshaller();

		Map<String, Class> aliases = new HashMap<>();
		aliases.put("customer", Customer.class);

		unmarshaller.setAliases(aliases);

		StaxEventItemReader<Customer> reader = new StaxEventItemReader<>();

		reader.setResource(new ClassPathResource("/data/XmlCustomers.xml"));
		reader.setFragmentRootElementName("customer");
		reader.setUnmarshaller(unmarshaller);

		return reader;
	}

	@Bean
	public ItemWriter<Customer> customerItemWriter() {
		return items -> {
			System.out.println("writing new chunk");

			for (Customer item : items) {
				System.out.println(item.toString());
			}
		};
	}
	
	@Bean
	public JdbcBatchItemWriter<Customer> dbItemWriter() {
		JdbcBatchItemWriter<Customer> itemWriter = new JdbcBatchItemWriter<>();

		itemWriter.setDataSource(this.dataSource);
		itemWriter.setSql("INSERT INTO CUSTOMER VALUES (:id, :firstName, :lastName, :birthdate)");
		itemWriter.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider());
		itemWriter.afterPropertiesSet();

		return itemWriter;
	}
	
	@Bean
	public FlatFileItemWriter<Customer> jsonFlatFileItemWriter() throws Exception {
		FlatFileItemWriter<Customer> itemWriter = new FlatFileItemWriter<>();

//		itemWriter.setLineAggregator(new PassThroughLineAggregator<>());
		itemWriter.setLineAggregator(new CustomerLineAggregator());
		String customerOutputPath = File.createTempFile("customerOutput", ".out").getAbsolutePath();
		System.out.println(">> Output Path: " + customerOutputPath);
		itemWriter.setResource(new FileSystemResource(customerOutputPath));
		itemWriter.afterPropertiesSet();

		System.out.println("writing new chunk");

		return itemWriter;
	}
	
	@Bean
	public StaxEventItemWriter<Customer> customXmlItemWriter() throws Exception {

		XStreamMarshaller marshaller = new XStreamMarshaller();

		Map<String, Class> aliases = new HashMap<>();
		aliases.put("customer", Customer.class);

		marshaller.setAliases(aliases);

		StaxEventItemWriter<Customer> writer = new StaxEventItemWriter<>();

		writer.setRootTagName("customers");
		writer.setMarshaller(marshaller);

		String customerOutputPath = File.createTempFile("customerOutput", ".xml").getAbsolutePath();
		System.out.println(">> Output Path: " + customerOutputPath);

		writer.setResource(new FileSystemResource(customerOutputPath));
		writer.afterPropertiesSet();
		
		return writer;
	}
	
	@Bean
	public CompositeItemWriter<Customer> multipleItemWriter() throws Exception {
		List<ItemWriter<? super Customer>> writers = new ArrayList<>();
		writers.add(customXmlItemWriter());
		writers.add(jsonFlatFileItemWriter());
		
		CompositeItemWriter<Customer> cWriter = new CompositeItemWriter<Customer>();
		cWriter.setDelegates(writers);
		
		// perform validation of its overall configuration and final initialization after all bean properties have been set.
		cWriter.afterPropertiesSet();
		
		return cWriter;
	}
	
	@Bean
	public ClassifierCompositeItemWriter<Customer> classifierTtemWriter() throws Exception {
		ClassifierCompositeItemWriter<Customer> itemWriter = new ClassifierCompositeItemWriter<>();

		itemWriter.setClassifier(new CustomerClassifier(customXmlItemWriter(), jsonFlatFileItemWriter()));

		return itemWriter;
	}
	
	@Bean 
	public ItemProcessor<Customer, Customer> processItem() {
		return new ItemProcessor<Customer, Customer>() {

			@Override
			public Customer process(Customer item) throws Exception {
				return new Customer(item.getId(), item.getFirstName().toUpperCase(), item.getLastName().toLowerCase(), item.getBirthdate());
			}
		};
	}
	
	@Bean
	ItemProcessor<Customer, Customer> filterItemProcessor() {
		return new CustomItemProcessor();
	}
	
	@Bean 
	public ValidatingItemProcessor<Customer> validateAndProcessItem() {
		ValidatingItemProcessor<Customer> processor = new ValidatingItemProcessor<Customer>(new CustomerValidator());
		
		// instead of failing the job on exception, it will just filter out the records
		processor.setFilter(true);
		
		return processor;
	}
	
	@Bean
	public CompositeItemProcessor<Customer, Customer> compositeItemProcessor() throws Exception{
		
		List<ItemProcessor<Customer,Customer>> processors = new ArrayList<>();
		
		processors.add(filterItemProcessor());
		processors.add(processItem());
		
		CompositeItemProcessor<Customer, Customer> processor = new CompositeItemProcessor<Customer, Customer>();
		processor.setDelegates(processors);
		processor.afterPropertiesSet();
		
		return processor;
	}
	
	@Bean
	public Step step1() throws Exception {
		return stepBuilderFactory.get("step52").<Customer, Customer>chunk(10)
				.reader(pagingItemReader())
				.processor(compositeItemProcessor())
				.writer(classifierTtemWriter())
				.stream(customXmlItemWriter())// optional. composite item writers 
				.stream(jsonFlatFileItemWriter())// 
				.build();
	}
	
	// Threaded environment
//	@Bean
//	public Step step1() throws Exception {
//		return stepBuilderFactory.get("step32")
//				.<Customer, Customer>chunk(1000)
//				.reader(pagingItemReader())
//				.writer(customerItemWriter())
//				.taskExecutor(new SimpleAsyncTaskExecutor())
//				.build();
//	}
	
//	@Bean
//	public Step step1() {
//		return stepBuilderFactory.get("step20")
//				.<String, String>chunk(10)
//				.reader(statefulReader())
//				.writer(writer())
//				.stream(statefulReader())
//				.build();
//	}

	@Bean
	public Job job() throws Exception {
		return jobBuilderFactory.get("job890").start(step1()).build();
	}

	@Bean
	public StatelessItemReader reader() {
		List<String> data = new ArrayList<String>();
		data.add("test1");
		data.add("test2");
		data.add("test3");

		return new StatelessItemReader(data);
	}
	
	@Bean
	public StatefulItemReader statefulReader() {
		List<String> data = new ArrayList<String>();
		
		for (int i = 1; i< 100; i++) {
			data.add(i + "");
		}

		return new StatefulItemReader(data);
	}

	@Bean
	public ItemWriter<String> writer() {
		return new ItemWriter<String>() {
			@Override
			public void write(List<? extends String> items) throws Exception {
				for (String item : items) {
					System.out.println("Writing item " + item);
				}
			}
		};
	}
	
	public void encryptData(Customer data) throws Exception {
		JSONObject jsonObject = new JSONObject();
		String base64data = "";
		String signedData = "";
		String encryptedData = "";
		String key = "";

		key = CryptoHelperUtil.generateSecureKey();

		JSONObject customerJson = new JSONObject(data);
		base64data = CryptoHelperUtil
				.encodeBase64String(jsonObject.toString());
		signedData = SignVerificationUtil.generateSign(base64data);

		jsonObject = new JSONObject();
		jsonObject.put("data", base64data);
		jsonObject.put("sign", signedData);
		encryptedData = CryptoHelperUtil.encrypt(jsonObject.toString(),
				key);

		jsonObject = new JSONObject();
		jsonObject.put("data", encryptedData);

	}

//	@Bean
//	public Step step1() {
//		return stepBuilderFactory.get("step12")
//				.<String, String>chunk(2) // 
//				.reader(reader())
//				.writer(writer())
//				.build();
//	}

//	@Bean
//	public Job interfaceJob() {
//		return jobBuilderFactory.get("interfaceJob")
//				.start(step1())
//				.build();
//	}
}
