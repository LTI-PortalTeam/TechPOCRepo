package com.priy.cassandrademo.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.datastax.driver.core.utils.UUIDs;
import com.priy.cassandrademo.model.AccountDetail;
import com.priy.cassandrademo.model.AddressDetail;
import com.priy.cassandrademo.model.EmployeeDetail;
import com.priy.cassandrademo.model.Tutorial;
import com.priy.cassandrademo.postgres.model.AccountEntity;
import com.priy.cassandrademo.postgres.model.EmployeeEntity;
import com.priy.cassandrademo.repository.EmployeeDetailRepository;
import com.priy.cassandrademo.repository.TutorialRepository;
import com.priy.cassandrademo.service.ActiveUserStore;
import com.priy.cassandrademo.service.EmployeeService;

@RestController
@RequestMapping("/api")
public class TutorialController {

  @Autowired
  TutorialRepository tutorialRepository;
  
  @Autowired
  ActiveUserStore activeUserStore;
  
  @Autowired
  EmployeeService employeeService;
  
  @Autowired
  EmployeeDetailRepository employeeDetailRepository;

  @GetMapping("/tutorials")
  public ResponseEntity<List<Tutorial>> getAllTutorials(@RequestParam(required = false) String title) {
    try {
      List<Tutorial> tutorials = new ArrayList<Tutorial>();

      if (title == null)
        tutorialRepository.findAll().forEach(tutorials::add);
      else
        tutorialRepository.findByTitleContaining(title).forEach(tutorials::add);

      if (tutorials.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(tutorials, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/tutorials/{id}")
  public ResponseEntity<Tutorial> getTutorialById(@PathVariable("id") UUID id) {
    Optional<Tutorial> tutorialData = tutorialRepository.findById(id);

    if (tutorialData.isPresent()) {
      return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/tutorials")
  public ResponseEntity<List<Tutorial>> createTutorial(@RequestBody Tutorial tutorial) {
    try {
    	List<Tutorial> list = new ArrayList<Tutorial>();
    	for(int i=5000;i<25000;i++) {
    		list.add(new Tutorial(UUIDs.timeBased(), tutorial.getTitle()+i, tutorial.getDescription()+i, false, tutorial.getEmail()));
    		 
    	}
    	tutorialRepository.saveAll(list);	
      //Tutorial _tutorial = tutorialRepository.save(new Tutorial(UUIDs.timeBased(), tutorial.getTitle(), tutorial.getDescription(), false, tutorial.getEmail()));
      return new ResponseEntity<>(list, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
    }
  }
  
  @PostMapping("/tutorials1")
  public ResponseEntity<Tutorial> createTutorial1(@RequestBody Tutorial tutorial) {
    try {
    	tutorial.setId(UUIDs.timeBased());
    	Tutorial _tutorial = tutorialRepository.save(tutorial);
      //Tutorial _tutorial = tutorialRepository.save(new Tutorial(UUIDs.timeBased(), tutorial.getTitle(), tutorial.getDescription(), false, tutorial.getEmail()));
      return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);
    } catch (Exception e) {
    	e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @PutMapping("/tutorials/{id}")
  public ResponseEntity<Tutorial> updateTutorial(@PathVariable("id") UUID id, @RequestBody Tutorial tutorial) {
    Optional<Tutorial> tutorialData = tutorialRepository.findById(id);

    if (tutorialData.isPresent()) {
      Tutorial _tutorial = tutorialData.get();
      _tutorial.setTitle(tutorial.getTitle());
      _tutorial.setDescription(tutorial.getDescription());
      _tutorial.setPublished(tutorial.isPublished());
      return new ResponseEntity<>(tutorialRepository.save(_tutorial), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/tutorials/{id}")
  public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") UUID id) {
    try {
      tutorialRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }

  @DeleteMapping("/tutorials")
  public ResponseEntity<HttpStatus> deleteAllTutorials() {
    try {
      tutorialRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }

  @GetMapping("/tutorials/published")
  public ResponseEntity<List<Tutorial>> findByPublished() {
    try {
      List<Tutorial> tutorials = tutorialRepository.findByPublished(true);

      if (tutorials.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(tutorials, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }
  
  @GetMapping("/loggedUsers")
  public List<String> getLoggedUsers() {
      //model.addAttribute("users", activeUserStore.getUsers());

      return activeUserStore.getUsers();
  }
  
  @GetMapping("/tutorials/Migrate")
  public ResponseEntity<List<EmployeeDetail>> migrateEmployeeData() {
    try {
      List<EmployeeDetail> empList = new ArrayList<EmployeeDetail>();
      List<EmployeeEntity> employees = employeeService.getAllEmp();
      for(EmployeeEntity emp : employees) {
    	  EmployeeDetail empD = new EmployeeDetail();
    	  empD.setEmployeeId(emp.getEmployeeId());
    	  empD.setEmail(emp.getEmail());
    	  empD.setFirstName(emp.getFirstName());
    	  empD.setLastName(emp.getLastName());
    	  List<AccountDetail> adtls = new ArrayList<AccountDetail>();
    	  for(AccountEntity acnt : emp.getAccounts()) {
    		  AccountDetail dtl = new AccountDetail();
    		  dtl.setAccountId(acnt.getAccountId());
    		  dtl.setAccountNumber(acnt.getAccountNumber());
    		  
    		  AddressDetail addrs = new AddressDetail();
    		  addrs.setHno(111);
    		  addrs.setCity("vaishali");
    		  addrs.setState("UP");
    		  addrs.setCountry("UP");
    		  
    		  //dtl.setAddress(addrs);
    		  
    		  adtls.add(dtl);
    	  }
    	  empD.setAccounts(adtls);
    	  
    	  empList.add(empD);
      }
      
      employeeDetailRepository.saveAll(empList);
      return new ResponseEntity<>(empList, HttpStatus.OK);
    } catch (Exception e) {
    	e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }

}
