package com.sandeep.redis;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.sandeep.redis.model.Employee;
import com.sandeep.redis.postgres.repository.EmployeeRepository;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

@SpringBootApplication
public class RedisMassInsertApplication implements CommandLineRunner{

	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Bean
	 JedisConnectionFactory jedisConnectionFactory() {
		JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
	    jedisConnectionFactory.setHostName("127.0.0.1");
	    jedisConnectionFactory.setPort(7006);
	    return jedisConnectionFactory;
	 }
	
	@Bean
	 RedisTemplate< String, Object > redisTemplate() {
	  final RedisTemplate< String, Object > template =  new RedisTemplate< String, Object >();
	  template.setConnectionFactory( jedisConnectionFactory() );
	  return template;
	 }
	
	
	
	
	public static void main(String[] args) {
		SpringApplication.run(RedisMassInsertApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		//RedisTemplate<String, Object> restTemplate = redisTemplate();
		
		
		RedisTemplate<String, Object> restTemplate = redisTemplate();
		System.out.println("Fetching Data from Postgres");
		long start = System.currentTimeMillis();
		Iterable<Employee> employeeList = employeeRepository.findAll();
		long end = System.currentTimeMillis();
		
		long elapsedTime = end - start;
		System.out.println("Time to fetch data from postgres Employee table : "+elapsedTime);
		
		System.out.println("Fetched Data from Postgres of Length ");
		System.out.println("Inserting Data from Redis");	
		for (Employee employee : employeeList) {
			
			/*Jedis jedis = new Jedis();
			Pipeline pipeline = jedis.pipelined();
			pipeline.hset("employee", String.format("%d", employee.getEmployeeNo()), employee);*/
			restTemplate.opsForHash().put("employee", String.format("%d", employee.getEmployeeNo()), employee);
			//System.out.println("Value added in table for Employee Id  : "+String.format("%d", employee.getEmployeeNo()));
			//Employee employee2 = (Employee) restTemplate.opsForHash().get("employee", String.format("%d", employee.getEmployeeNo()));
			//System.out.println("Fetched employee Details "+employee2);
		}
		System.out.println("Inserted Data from Redis");
		
		start = System.currentTimeMillis();
		 restTemplate.opsForHash().entries("employee");
		 end = System.currentTimeMillis();
		 elapsedTime = end - start;
			System.out.println("Time to fetch data from redis Employee table : "+elapsedTime);
		
	}
		
	
}
