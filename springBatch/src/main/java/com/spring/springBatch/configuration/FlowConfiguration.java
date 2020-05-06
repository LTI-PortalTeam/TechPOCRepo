package com.spring.springBatch.configuration;

import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
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
public class FlowConfiguration {
	
	@Autowired
	private StepBuilderFactory sbf;
	
	@Bean
	public Step step1() {
		return sbf.get("step1").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch step 1 inside flow");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	
	@Bean
	public Step step2() {
		return sbf.get("step2").tasklet((contribution, chunkContext) -> {
				System.out.println("Spring batch step 2 inside flow");
				return RepeatStatus.FINISHED;
			}).build();
	}
	
	@Bean
	public Flow foo() {
		FlowBuilder<Flow> flow = new FlowBuilder<Flow>("foo");
		
		flow.start(step1())
			.next(step2())
			.end();
		
		return flow.build();
	}
}
