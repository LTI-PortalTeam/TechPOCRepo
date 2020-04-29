package com.sandeep.redis.postgres.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.sandeep.redis.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
