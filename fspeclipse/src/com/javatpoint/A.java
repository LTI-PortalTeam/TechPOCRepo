package com.javatpoint;

import org.springframework.beans.factory.annotation.Autowired;

public class A {

	@Autowired
	B b;  
	public A()
	{
		System.out.println("a is created");
	}  
	public B getB()
	{  
	    return b;  
	}  
	public void setB(B b)
	{  
	    this.b = b;  
	}  
	void print()
	{
		System.out.println("hello a");
		}  
	void display()
	{  
	    print();  
	    b.print();  
	} 
}
