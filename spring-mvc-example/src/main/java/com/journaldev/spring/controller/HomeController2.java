package com.journaldev.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class HomeController2 {

	@RequestMapping("/hello2")
		public String display() {
		
		return "ViewPage2";
	}
	
	
}
