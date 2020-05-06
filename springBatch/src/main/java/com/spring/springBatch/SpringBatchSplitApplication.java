package com.spring.springBatch;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.spring.springBatch.configuration.BatchConfiguration;
import com.spring.springBatch.configuration.FlowConfiguration;

@SpringBootApplication
@EnableBatchProcessing
public class SpringBatchSplitApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBatchSplitApplication.class, args);
	}

}
