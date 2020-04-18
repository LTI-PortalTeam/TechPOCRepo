package com.javatpoint;

public class Employee {
	private int id;  
	private String name;  
	//private String city;
	private Address address;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	/*
	 * public String getCity() { return city; } public void setCity(String city) {
	 * this.city = city; }
	 * 
	 */void display()
	{  
	    System.out.println(id+" "+name);  
	    System.out.println(address);
	}  
	  
}
