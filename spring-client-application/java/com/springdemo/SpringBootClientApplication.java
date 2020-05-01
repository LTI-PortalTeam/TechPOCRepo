package com.springdemo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
@SpringBootApplication
@ComponentScan(basePackages= {"com.springdemo"})
public class SpringBootClientApplication {

	public static void main(String[] args) {
        SpringApplication.run(SpringBootClientApplication.class, args);
    }
}
