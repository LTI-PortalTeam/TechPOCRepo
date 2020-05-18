/**
 * 
 */
package com.spring.springBatch.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.job.builder.FlowBuilder;
import org.springframework.batch.core.job.flow.Flow;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;

/**
 * @author pgoel
 *
 */
@Configuration
public class BatchConfiguration {

	@Autowired
	private JobBuilderFactory jbf;

	@Autowired
	private StepBuilderFactory sbf;

	@Bean
	public Tasklet tasklet(@Value("#{jobParameters['message']}") String message) {
		return new CountingTasklet();
	}

	@Bean
	public Flow flow1() {
		System.out.println("Executing flow 1");

		FlowBuilder<Flow> flow = new FlowBuilder<Flow>("flow1");

		flow.start(sbf.get("step1").tasklet(tasklet(null)).build());

		return flow.build();
	}

	@Bean
	public Flow flow2() {
		System.out.println("Executing flow 2");

		FlowBuilder<Flow> flow = new FlowBuilder<Flow>("foo");

		flow.start(sbf.get("step2").tasklet(tasklet(null)).build()).next(sbf.get("step3").tasklet(tasklet(null)).build());

		return flow.build();
	}

	@Bean
	public Job job() {
		System.out.println("Executing job");
		return jbf.get("job").start(flow1())
				.split(new SimpleAsyncTaskExecutor()).add(flow2())
				.end().build();
	}

	public static class CountingTasklet implements Tasklet {

		@Override
		public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
			System.out.println(String.format("%s has been executed on thread %s", chunkContext.getStepContext(),
					Thread.currentThread().getName()));
			return RepeatStatus.FINISHED;
		}

	}

}
