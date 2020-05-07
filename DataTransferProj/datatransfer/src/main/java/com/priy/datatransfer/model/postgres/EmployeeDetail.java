package com.priy.datatransfer.model.postgres;

import java.io.Serializable;
import java.util.List;

import com.datastax.driver.mapping.annotations.PartitionKey;
import com.datastax.driver.mapping.annotations.Table;

//@Table(keyspace = "demo", name = "employeedetail")
public class EmployeeDetail implements Serializable{
	
	//@PartitionKey
	 private Integer id;
		
	 private String email;
	 private String first_name;
	 private String last_name;
	 
	 private List<AccountDetail> accounts;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public List<AccountDetail> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<AccountDetail> accounts) {
		this.accounts = accounts;
	}
	 
	 

}
