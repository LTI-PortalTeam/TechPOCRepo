package com.javatpoint;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class Test {  
	    public static void main(String[] args) {  
	          
	      //  Resource r=new ClassPathResource("applicationContext.xml"); 
	        ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
	      //  BeanFactory factory=new XmlBeanFactory(r);  
	          
	        Employee e=(Employee)app.getBean("obj");  
	        e.display();  
	          
	    }  
}
