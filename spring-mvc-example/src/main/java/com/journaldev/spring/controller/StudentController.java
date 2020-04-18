package com.journaldev.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.journaldev.spring.beans.Student;
import com.journaldev.spring.dao.StudDaoImpl;

@Controller
public class StudentController {

	@Autowired
	StudDaoImpl dao;
	 @RequestMapping("/welcome")  
	    public String showform(Model m){  
	    	m.addAttribute("message", new Student());
	    	return "welcome"; 
	    }  
	 @RequestMapping("/student")  
	    public String viewemp(Model m){  
	        List<Student> list=dao.getStudents();  
	        m.addAttribute("list",list);
	        return "student";  
	    }

}
