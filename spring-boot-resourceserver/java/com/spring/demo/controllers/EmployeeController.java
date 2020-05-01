package com.spring.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.demo.model.Employee;
@Controller
public class EmployeeController {
	@RequestMapping(value = "/user/getEmployeesList", produces = "application/json")
    @ResponseBody
    public List<Employee> getEmployeesList() {
        List<Employee> employees = new ArrayList<>();
        Employee emp = new Employee();
        emp.setEmpId("emp1");
        emp.setEmpName("emp1");
        employees.add(emp);
        Employee emp2 = new Employee();
        emp2.setEmpId("emp2");
        emp2.setEmpName("emp2");
        employees.add(emp2);
        return employees;

    }
}
