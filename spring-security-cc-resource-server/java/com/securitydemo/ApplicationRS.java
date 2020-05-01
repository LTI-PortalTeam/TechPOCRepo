package com.securitydemo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@EnableResourceServer
@SpringBootApplication
//@ComponentScan(basePackages= {"com.securitydemo"})
public class ApplicationRS {
	public static void main(String[] args) {
		SpringApplication.run(ApplicationRS.class, args);
	}
}
