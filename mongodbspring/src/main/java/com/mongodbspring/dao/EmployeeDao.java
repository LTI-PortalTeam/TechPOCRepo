package com.mongodbspring.dao;
import java.util.List;

import com.mongodbspring.model.Employee;

public interface EmployeeDao {
	public Employee createEmployee(Employee employee); 
	public Employee getEmployeeByFirstName(String firstname); 
	public List<Employee> getAllEmployees();
	public void updateEmployee(Employee employee); 
	public void deleteEmployee(String id); 
	public Employee findAndUpdate(String name,String lastName);
}
