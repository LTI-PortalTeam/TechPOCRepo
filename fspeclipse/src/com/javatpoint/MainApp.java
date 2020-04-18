package com.javatpoint;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class MainApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		// ApplicationContext context=new
		// ClassPathXmlApplicationContext("applicationContext.xml");

		Resource resource = new ClassPathResource("applicationContext.xml");
		BeanFactory factory = new XmlBeanFactory(resource);

		TextEditor edit = (TextEditor) factory.getBean("textEditor");
		System.out.println("hello");
		
		edit.spellCheck();
	}

}
