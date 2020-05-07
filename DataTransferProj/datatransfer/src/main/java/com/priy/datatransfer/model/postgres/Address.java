package com.priy.datatransfer.model.postgres;

import java.io.Serializable;

import com.datastax.driver.mapping.annotations.UDT;

@UDT(keyspace = "demo", name = "address")
public class Address implements Serializable{

	private String street;
	private String city;
	private String zipcode;
	

	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getZipcode() {
		return zipcode;
	}
	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}
	
	
}
