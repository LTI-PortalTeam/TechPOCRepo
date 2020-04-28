package com.priy.cassandrademo.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datastax.driver.core.utils.UUIDs;
import com.priy.cassandrademo.model.Tutorial;
import com.priy.cassandrademo.postgres.model.AccountEntity;
import com.priy.cassandrademo.postgres.model.EmployeeEntity;
import com.priy.cassandrademo.postgres.repo.EmployeeRepository;
import com.priy.cassandrademo.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	EmployeeService employeeService;
	
	  @GetMapping("/employeeList")
	  public ResponseEntity<List<EmployeeEntity>> getAllTutorials(@RequestParam(required = false) String title) {
	    try {
	      List<EmployeeEntity> employees = new ArrayList<EmployeeEntity>();

	      if (title == null)
	    	  employeeRepository.findAll().forEach(employees::add);
	      else
	    	  employeeRepository.findByEmployeeId(title).forEach(employees::add);

	      if (employees.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(employees, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	  
	  @PostMapping("/addEmployee")
	  public ResponseEntity<List<EmployeeEntity>> createTutorial(@RequestBody(required=false) EmployeeEntity emp) {
	    try {
	    	List<EmployeeEntity> list = new ArrayList<EmployeeEntity>();

	        AccountEntity account1 = new AccountEntity();
	        account1.setAccountNumber("123");
	 
	        AccountEntity account2 = new AccountEntity();
	        account2.setAccountNumber("456");
	 
	        AccountEntity account3 = new AccountEntity();
	        account3.setAccountNumber("789");
	 
	        //Add new Employee object
	        EmployeeEntity firstEmployee = new EmployeeEntity();
	        firstEmployee.setEmail("first@mail.com");
	        firstEmployee.setFirstName("priy");
	        firstEmployee.setLastName("ranjan");
	 
	        EmployeeEntity secondEmployee = new EmployeeEntity();
	        secondEmployee.setEmail("second@mail.com");
	        secondEmployee.setFirstName("ram");
	        secondEmployee.setLastName("kumar");
	 
	        Set<AccountEntity> accountsOfFirstEmployee = new HashSet<AccountEntity>();
	        accountsOfFirstEmployee.add(account1);
	        accountsOfFirstEmployee.add(account2);
	 
	        Set<AccountEntity> accountsOfSecondEmployee = new HashSet<AccountEntity>();
	        accountsOfSecondEmployee.add(account3);
	 
	        firstEmployee.setAccounts(accountsOfFirstEmployee);
	        list.add(firstEmployee);
	        secondEmployee.setAccounts(accountsOfSecondEmployee);
	        list.add(secondEmployee);
	        
	        employeeRepository.saveAll(list);	
	      return new ResponseEntity<>(list, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
	    }
	  }

}
