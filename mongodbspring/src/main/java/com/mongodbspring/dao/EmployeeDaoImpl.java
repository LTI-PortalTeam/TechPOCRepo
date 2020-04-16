package com.mongodbspring.dao;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.mongodbspring.model.Employee;
import com.mongodbspring.repository.EmployeeRepository;

@Repository
public class EmployeeDaoImpl implements EmployeeDao{
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	public EmployeeRepository employeeRepository;
     
	public Employee createEmployee(Employee employee)
	{
		return employeeRepository.insert(employee);
	}

	public Employee getEmployeeByFirstName(String firstname)
	{
		return employeeRepository.findByFirstname(firstname);
	}
	
	public Employee getEmployeeById(String id)
	{
		Optional<Employee> e =  employeeRepository.findById(id);
		return e.get();
	}

	public List<Employee> getAllEmployees()
	{
		return employeeRepository.findAll();
	}

	public void updateEmployee(Employee employee)
	{
		employeeRepository.save(employee);
	}

	public void deleteEmployee(String id)
	{
		employeeRepository.deleteById(id);
	}
	public Employee findAndUpdate(String name, String lastName) {
		Employee emp=mongoTemplate.findOne(Query.query(Criteria.where("firstname").is(name)), Employee.class);
		emp.setLastname(lastName);
		return employeeRepository.save(emp);
		
	}
}
