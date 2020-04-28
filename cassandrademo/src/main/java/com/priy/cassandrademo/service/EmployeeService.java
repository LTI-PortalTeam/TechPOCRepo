package com.priy.cassandrademo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.priy.cassandrademo.postgres.model.EmployeeEntity;
import com.priy.cassandrademo.postgres.repo.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public List<EmployeeEntity> getAllEmp() {
		try {
			List<EmployeeEntity> employees = new ArrayList<EmployeeEntity>();

			employeeRepository.findAll().forEach(employees::add);

			return employees;
		} catch (Exception e) {
			return null;
		}
	}

}
