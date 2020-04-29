package com.sandeep.redis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sandeep.redis.util.RedisTester;

@SpringBootApplication
public class RedisClusterTestApplication implements CommandLineRunner{
	
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private RedisTester redisTester;

	public static void main(String[] args) {
		SpringApplication.run(RedisClusterTestApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		LOGGER.info("Starting Redis Test...");
		System.out.println(this.redisTester.getRedisClusterString());
		this.redisTester.runTest();
		LOGGER.info("... test completed");
		
	}

}
