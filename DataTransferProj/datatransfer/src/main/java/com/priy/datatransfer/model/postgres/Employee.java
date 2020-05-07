package com.priy.datatransfer.model.postgres;

import java.io.Serializable;
import java.text.MessageFormat;
import java.util.List;
import java.util.Set;

import com.datastax.driver.mapping.annotations.Frozen;
import com.datastax.driver.mapping.annotations.PartitionKey;
import com.datastax.driver.mapping.annotations.Table;
import com.datastax.driver.mapping.annotations.UDT;

//@Table(keyspace = "demo", name = "employee")
public class Employee implements Serializable{
	
	//@PartitionKey
	 private Integer id;
	
	 private String email;
	 private String first_name;
	 private String last_name;
	 //private List<String> accounts;
	 
	 //private Set<Account> accountnums;
	 //private Account accountnums;
	 
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
//	public List<String> getAccounts() {
//		return accounts;
//	}
//	public void setAccounts(List<String> accounts) {
//		this.accounts = accounts;
//	}
//	public Account getAccountnums() {
//		return accountnums;
//	}
//	public void setAccountnums(Account accountnums) {
//		this.accountnums = accountnums;
//	}

	
    @Override
    public String toString() {
        return MessageFormat.format("Employee'{'id={0}, email=''{1}'', firstName=''{2}'' ,lastName={3}'}'", id, email, first_name,last_name);
    }
	 
	 

}
