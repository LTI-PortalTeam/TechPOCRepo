package com.mongodbspring.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mongodbspring.model.Employee;

public interface EmployeeRepository extends  MongoRepository<Employee, String>
{
	public Employee findByFirstname(String firstname);
}
