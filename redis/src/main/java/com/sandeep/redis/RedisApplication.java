package com.sandeep.redis;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sandeep.redis.model.LineItem;
import com.sandeep.redis.model.Order;
import com.sandeep.redis.repository.LineItemRepository;
import com.sandeep.redis.repository.OrderRepository;

@SpringBootApplication
public class RedisApplication implements CommandLineRunner{

	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	LineItemRepository lineItemRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(RedisApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		Long orderId = generateId();
		
		List<LineItem> lineItems = Arrays.asList(new LineItem(orderId,generateId(),"plunger"),
					  new LineItem(orderId,generateId(),"bread"),
					  new LineItem(orderId,generateId(),"plaster"),
					  new LineItem(orderId,generateId(),"hanger"),
					  new LineItem(orderId,generateId(),"mouse"),
					  new LineItem(orderId,generateId(),"basket"),
					  new LineItem(orderId,generateId(),"mug")
						);
		lineItemRepository.saveAll(lineItems);
		
		Order order = new Order(orderId,new Date(),lineItems);
		orderRepository.save(order);
		
		Collection<Order> orderFromDB = orderRepository.findByWhen(order.getWhen());
		orderFromDB.stream().forEach(o->o.getLineItems().forEach(System.out::println));
		
	}

	private Long generateId() {
		
		Long random = new Random().nextLong();
		return Math.max(random, random*-1);
		
	}

}
