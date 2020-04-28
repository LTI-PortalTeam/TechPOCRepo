package com.priy.cassandrademo.model;

import org.springframework.data.cassandra.core.mapping.UserDefinedType;

@UserDefinedType("addressdetail")
public class AddressDetail {
	
	private int hno;
	private String city;
	private String state;
	private String country;
	public int getHno() {
		return hno;
	}
	public void setHno(int hno) {
		this.hno = hno;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	
	

}
