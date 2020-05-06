package com.spring.springBatch.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.job.builder.FlowBuilder;
import org.springframework.batch.core.job.flow.Flow;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableBatchProcessing
public class FlowLastConfiguration {
//	
//	@Autowired
//	private JobBuilderFactory jbf;
//	
//	@Autowired
//	private StepBuilderFactory sbf;
//	
//	@Bean
//	public Step myLastStep() {
//		return sbf.get("myStep").tasklet(new Tasklet() {
//
//			@Override
//			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
//				System.out.println("Spring batch my last Step executed in a flow");
//				return RepeatStatus.FINISHED;
//			}
//			
//		}).build();
//	}
//	
//	@Bean
//	public Job flowLastJob(Flow flow) {
//		System.out.println("Executing transition job flow last");
//		return jbf.get("flowLastJob")
//				.start(myLastStep())	
//				.on("COMPLETED").to(flow)
//				.end()
//				.build();
//	}
}
