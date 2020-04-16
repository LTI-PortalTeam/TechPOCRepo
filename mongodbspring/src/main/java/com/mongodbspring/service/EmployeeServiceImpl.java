package com.mongodbspring.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodbspring.dao.EmployeeDao;
import com.mongodbspring.model.Employee;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	EmployeeDao employeeDao;

	public List<Employee> getAllEmployees() {
		// TODO Auto-generated method stub
		return employeeDao.getAllEmployees();
	}
	
	public Employee addEmployee(Map<String,Object> requestMap) {
		Employee emp=new Employee();
		String firstName=(String)requestMap.get("firstName");
		emp.setFirstname(firstName);
		String lastName=(String)requestMap.get("lastName");
		emp.setLastname(lastName);
		// TODO Auto-generated method stub
		return employeeDao.createEmployee(emp);
	}
	
	public Employee findAndUpdate(String name, String lastName) {
		// TODO Auto-generated method stub
		return employeeDao.findAndUpdate(name, lastName);
	}

}
