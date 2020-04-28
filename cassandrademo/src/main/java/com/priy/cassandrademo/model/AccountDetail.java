package com.priy.cassandrademo.model;

import java.util.List;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

import com.datastax.driver.core.DataType.Name;

@UserDefinedType("accountdetail")
public class AccountDetail {
	
    private Integer accountId;
    private String accountNumber;
    
//	@CassandraType(type = Name.UDT,userTypeName = "addressdetail")
//	private AddressDetail address;
	
	public Integer getAccountId() {
		return accountId;
	}
	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
//	public AddressDetail getAddress() {
//		return address;
//	}
//	public void setAddress(AddressDetail address) {
//		this.address = address;
//	}
	

}
