package com.spring.springBatch;

import java.util.Date;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class RetryApplication {

	public static void main(String[] args) {
		String[] argument = new String[2];
		argument[0] = "retry=writer";
		argument[1]= new Date().toString();
		SpringApplication.run(RetryApplication.class, argument);
	}
}
