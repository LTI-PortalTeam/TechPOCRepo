package com.sandeep.redis.repository;

import java.util.Collection;
import java.util.Date;

import org.springframework.data.repository.CrudRepository;

import com.sandeep.redis.model.Order;

public interface OrderRepository extends CrudRepository<Order, Long> {

	Collection<Order> findByWhen(Date when);
}
