package com.priy.cassandrademo.model;

import java.util.List;
import java.util.Set;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.datastax.driver.core.DataType.Name;

@Table
public class EmployeeDetail {
	
	@PrimaryKey
	private Integer employeeId;
	private String email;
	private String firstName;
	private String lastName;
	
	@CassandraType(type = Name.UDT,userTypeName = "accountdetail")
	private List<AccountDetail> accounts;
	
	public Integer getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public List<AccountDetail> getAccounts() {
		return accounts;
	}
	public void setAccounts(List<AccountDetail> accounts) {
		this.accounts = accounts;
	}

	
	

}
