package com.mongodbspring.controller;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mongodbspring.model.Employee;
import com.mongodbspring.service.EmployeeService;

@RestController
public class MongodbController {
	Logger logger=Logger.getLogger(MongodbController.class);
	@Autowired
	EmployeeService employeeService;
	
	@RequestMapping(value="/getAllEmp",method=RequestMethod.GET)
	public List<Employee> getAllEmployees() {
		List<Employee> employees=null;
		employees=employeeService.getAllEmployees();
		return employees;
	}
	
	@RequestMapping(value="/addEmployee",method=RequestMethod.POST)
	public Employee addEmployee(@RequestBody Map<String,Object> reqestMap) {
		Employee emp=null;
		emp=employeeService.addEmployee(reqestMap);
		return emp;
	}
	@RequestMapping(value="/updateLastName",method=RequestMethod.POST)
	public Employee updateLastName(@RequestBody Map<String,Object> reqestMap) {
		return	employeeService.findAndUpdate((String)reqestMap.get("firstName"), (String)reqestMap.get("lastName"));
	}

}
