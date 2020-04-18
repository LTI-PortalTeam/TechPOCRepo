package com.journaldev.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

	/**
	 * Simply selects the home view to render by returning its name.
	 */

	@RequestMapping("/hello1")
	public String display() {
		return "ViewPage1";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "Index";
	}

	/*
	 * public String home(Locale locale, Model model) {
	 * System.out.println("Home Page Requested, locale = " + locale); Date date =
	 * new Date(); DateFormat dateFormat =
	 * DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
	 * 
	 * String formattedDate = dateFormat.format(date);
	 * 
	 * model.addAttribute("serverTime", formattedDate);
	 * 
	 * return "home"; }
	 * 
	 * @RequestMapping(value = "/user", method = RequestMethod.POST) public String
	 * user(@Validated User user, Model model) {
	 * System.out.println("User Page Requested"); model.addAttribute("userName",
	 * user.getUserName()); return "user"; }
	 */}
