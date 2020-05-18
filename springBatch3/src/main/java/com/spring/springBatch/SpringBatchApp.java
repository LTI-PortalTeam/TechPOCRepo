package com.spring.springBatch;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class SpringBatchApp {

	public static void main(String[] args) {
		SpringApplication.run(SpringBatchApp.class, args);
	}
}
