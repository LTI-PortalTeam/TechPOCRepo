package com.mongodbspring.service;

import java.util.List;
import java.util.Map;

import com.mongodbspring.model.Employee;

public interface EmployeeService {
  List<Employee> getAllEmployees();
  Employee addEmployee(Map<String,Object> requestMap);
  public Employee findAndUpdate(String name,String lastName);
}
