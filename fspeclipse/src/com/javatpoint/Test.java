package com.javatpoint;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class Test {
	public static void main(String[] args) {
		
		 Resource resource = new ClassPathResource("applicationContext.xml");
		 BeanFactory factory = new XmlBeanFactory(resource);
		 
		//ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

		Student student = (Student) factory.getBean("student");
		System.out.println("Name : " + student.getName());
		System.out.println("Age : " + student.getAge());

		/*
		 * A a = factory.getBean("a", A.class); a.display();
		 */

		/*
		 * Employee e=(Employee)factory.getBean("e1"); e.show();
		 */
		// s.show();
		/*
		 * Student student=(Student)factory.getBean("studentbean");
		 * student.displayInfo();
		 */
	}
}
