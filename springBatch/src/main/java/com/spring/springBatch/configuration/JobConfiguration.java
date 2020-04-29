package com.spring.springBatch.configuration;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableBatchProcessing
public class JobConfiguration {

	@Autowired
	private JobBuilderFactory jbf;
	
	@Autowired
	private StepBuilderFactory sbf;
	
	@Bean
	public Step step1() {
		return sbf.get("step1").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch step 1");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	
	@Bean
	public Step step2() {
		return sbf.get("step2").tasklet((contribution, chunkContext) -> {
				System.out.println("Spring batch step 2");
				return RepeatStatus.FINISHED;
			}).build();
	}
	
	@Bean
	public Step step3() {
		return sbf.get("step3").tasklet(new Tasklet() {

			@Override
			public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
				System.out.println("Spring batch step 3");
				return RepeatStatus.FINISHED;
			}
			
		}).build();
	}
	@Bean
	public Job firstJob() {
		System.out.println("Executing first Spring batch step1");
		return jbf.get("springJob").start(step1()).build();
	}
	
	@Bean
	public Job transitionJob() {
		System.out.println("Executing transition job");
		return jbf.get("transitionJob")
				.start(step1())
				.next(step2())
				.next(step3())
				.build();
	}
	
	@Bean
	public Job transitionJobOnCompletion() {
		System.out.println("Executing transition job 2");
		return jbf.get("transitionJob2")
				.start(step1())
				.on("COMPLETED").to(step2())
				.from(step2())
				.on("COMPLETED").stopAndRestart(step3()) // stop executing in run 1. will resume from here when restarted
				.from(step3())
				.end()
				.build();
	}
}
