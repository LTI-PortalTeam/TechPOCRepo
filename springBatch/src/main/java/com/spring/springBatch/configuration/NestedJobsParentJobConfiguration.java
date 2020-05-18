package com.spring.springBatch.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.JobStepBuilder;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class NestedJobsParentJobConfiguration {

	@Autowired
	private JobBuilderFactory jbf;
	
	@Autowired
	private StepBuilderFactory sbf;
	
	@Autowired
	private Job childJob;
	
	@Autowired
	private JobLauncher jobLauncher;
	
	@Bean
	public Step step1Parent() {
		return sbf.get("parent").tasklet((contribution, chunkContext) -> {
			System.out.println("This is parent step");
			return RepeatStatus.FINISHED;
		}).build();
	}
	
	@Bean 
	public Job parentJob(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
		Step childJobStep = new JobStepBuilder(new StepBuilder("childJobStep"))
				.job(childJob)
				.launcher(jobLauncher)
				.repository(jobRepository)
				.transactionManager(transactionManager).build();
		return jbf.get("parentJob").start(step1Parent()).next(childJobStep).build();
	}
	


}
