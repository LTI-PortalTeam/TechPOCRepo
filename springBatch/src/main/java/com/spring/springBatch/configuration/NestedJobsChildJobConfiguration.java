/**
 * 
 */
package com.spring.springBatch.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author pgoel
 *
 */
@Configuration
public class NestedJobsChildJobConfiguration {

	@Autowired
	private JobBuilderFactory jbf;
	
	@Autowired
	private StepBuilderFactory sbf;
	
	
	@Bean
	public Step step1a() {
		return sbf.get("step1a").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch step 1a inside flow");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	
	@Bean Job childJob() {
		return jbf.get("childJob").start(step1a()).build();
	}
	
}
