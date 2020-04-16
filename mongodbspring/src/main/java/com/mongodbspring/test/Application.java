package com.mongodbspring.test;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import com.mongodbspring.dao.EmployeeDaoImpl;
import com.mongodbspring.model.Book;
import com.mongodbspring.model.Employee;
import com.mongodbspring.repository.BookRepository;
public class Application {
	public static void main( String[] args )
    {
    	 AbstractApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
		//ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
         //EmployeeDaoImpl employeeDaoImpl = (EmployeeDaoImpl) context.getBean("employeeDaoImpl");
         
         // Create Employee
        /* Employee employee1 = new Employee("Tomwwws","Jerrywwws");
         employeeDaoImpl.createEmployee(employee1);
         
         // Get Employee by FirstName
         Employee employee2 = employeeDaoImpl.getEmployeeByFirstName("Tomwwws");
         System.out.println("*** Get Employee By FirstName ***");
         System.out.println("First Name : "+employee2.getFirstname());
         System.out.println("Last  Name : "+employee2.getLastname());*/
         
         // Get all Employees
        /* List<Employee> employeeList = employeeDaoImpl.getAllEmployees();
         System.out.println("*** Get All Employees ***");
         for(Employee emp : employeeList)
         {
        	 System.out.println("First Name : "+emp.getFirstname());
             System.out.println("Last  Name : "+emp.getLastname());
             System.out.println("#######################################");
         }*/
         
         // Update Employee - Read from DB and Update the Employee
         /*Employee employee3 = employeeDaoImpl.getEmployeeById("5e7c77a96f1b124e469e56f6");
         employee3.setLastname("Jonny");
         employeeDaoImpl.updateEmployee(employee3);*/
         
         // Delete Employee
        // employeeDaoImpl.deleteEmployee("5e7c77a96f1b124e469e56f6");
    	BookRepository repository = context.getBean(BookRepository.class);
    	/*Book b1 = new Book(101, "Angular Tutorials", 200, "Krishna", "Frontend");
 		Book b2 = new Book(102, "JavaScript Tutorials", 200, "Krishna", "Frontend");		
 		Book b3 = new Book(103, "Spring Tutorials", 300, "Mahesh", "Backend");
 		Book b4 = new Book(104, "Java Tutorials", 250, "Krishna", "Backend");
 		Book b5 = new Book(105, "Hibernate Tutorials", 150, "Mahesh", "Backend");
 		List<Book> list = new ArrayList<Book>();
 		
 		list.add(b1);
 		list.add(b2);
 		list.add(b3);
 		list.add(b4);
 		list.add(b5);		
 		
 		List<Book> obj = repository.saveAll(list);*/
    	//https://www.concretepage.com/spring-5/spring-data-mongodb-query
    	
    	Book b=repository.findBookById(103);
    	System.out.println(b);
    	System.out.println("\n");
    	List<Book> books=repository.findBooksByWriterAndCategory("Krishna", "Frontend");
    	for(Book book:books){
    		System.out.println(book);
    	}
    	System.out.println("--- findBooksGtThanNoOfPages() ---");
    	List<Book> bookgt=repository.findBooksGtThanNoOfPages(200);
         for(Book bgt:bookgt){
        	 System.out.println(bgt);
         }
         System.out.println("--- findBooksByWriterAndLtThanNoOfPages() ---");	
         List<Book> booklt= repository.findBooksByWriterAndLtThanNoOfPages("Mahesh", 250);
         for(Book blt:booklt){
        	 System.out.println(blt);
         }
         System.out.println("--- findBooksByWriterOrCategory() :---");
       
         List<Book> b1List=repository.findBooksByWriterOrCategory("Mahesh","Backend");
         for(Book b1:b1List){
        	 System.out.println(b1);
         }
         System.out.println("--- findBooksWithCertainFields() ---");
         List<Book> b2List=repository.findBooksWithCertainFields("Mahesh", "Backend");
         for(Book b2:b2List){
        	 System.out.println(b2);
         }
         
         System.out.println("--- findBookCountByCategory() ---");
         Integer count=repository.findBookCountByCategory("Backend");
         System.out.println(count);
         context.close();
    }
}
