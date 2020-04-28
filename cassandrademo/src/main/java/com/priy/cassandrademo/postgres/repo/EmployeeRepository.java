package com.priy.cassandrademo.postgres.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.priy.cassandrademo.postgres.model.EmployeeEntity;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Integer>{

	Iterable<EmployeeEntity> findByEmployeeId(String title);

}
