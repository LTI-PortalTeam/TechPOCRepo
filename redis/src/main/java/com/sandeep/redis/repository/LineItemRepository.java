package com.sandeep.redis.repository;

import org.springframework.data.repository.CrudRepository;

import com.sandeep.redis.model.LineItem;

public interface LineItemRepository extends CrudRepository<LineItem, Long> {

}
