package com.mongodbspring.test;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.MongoClient;

@Configuration
@ComponentScan (basePackages = {"com.mongodbspring"})
@EnableMongoRepositories (basePackages = {"com.mongodbspring"})
public class SpringConfig {
	   @Bean
	   public MongoDbFactory mongoDbFactory() 
	   {
	        MongoClient mongoClient = new MongoClient("localhost", 27017);
	        return new SimpleMongoDbFactory(mongoClient, "mydb");
	    }
	 
	    @Bean
	    public MongoTemplate mongoTemplate()
	    {
	        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory());
	        return mongoTemplate;
	    }
}
