package com.priy.cassandrademo.repository;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.priy.cassandrademo.model.EmployeeDetail;


public interface EmployeeDetailRepository extends CassandraRepository<EmployeeDetail, Integer>{

}
