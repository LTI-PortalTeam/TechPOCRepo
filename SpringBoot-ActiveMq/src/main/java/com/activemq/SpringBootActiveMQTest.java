package com.activemq;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.jms.core.JmsTemplate;

@SpringBootApplication
public class SpringBootActiveMQTest {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(SpringBootActiveMQTest.class, args);
		
		JmsTemplate jms = ctx.getBean(JmsTemplate.class);
		jms.convertAndSend("MyQueue1", "trial 1");
		System.out.println("done");
	}
}