package com.spring.springBatch.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.job.flow.FlowExecutionStatus;
import org.springframework.batch.core.job.flow.JobExecutionDecider;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OddEvenConfiguration {

	@Autowired
	private JobBuilderFactory jbf;
	
	@Autowired
	private StepBuilderFactory sbf;
	
	@Bean
	public Step startStep() {
		return sbf.get("startStep").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch start step");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	
	
	@Bean
	public Step eventStep() {
		return sbf.get("evenStep").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch even step");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	
	@Bean
	public Step oddStep() {
		return sbf.get("oddStep").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch odd step");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	
	@Bean
	public JobExecutionDecider decider() {
		return new OddDecider();
	}

	@Bean
	public Job job() {
		return jbf.get("job123")
				.start(startStep())
				.next(decider())
				.from(decider()).on("ODD").to(oddStep())
				.from(decider()).on("EVEN").to(eventStep())
				.from(decider()).on("*").to(decider())
				.from(decider()).on("ODD").to(oddStep())
				.from(decider()).on("EVEN").to(eventStep())
				.end()
				.build();


	}
	
	public static class OddDecider implements JobExecutionDecider {

		private int count  = 0;
		
		@Override
		public FlowExecutionStatus decide(JobExecution jobExecution, StepExecution stepExecution) {

			count++;
			
			System.out.println("Spring batch deciding");

			
			if (count %2 == 0) {
				return new FlowExecutionStatus("EVEN");
			} else {
				return new FlowExecutionStatus("ODD");

			}

		}
		
		
	}
}
