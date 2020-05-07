package com.priy.datatransfer.model.postgres;

import java.io.Serializable;

import com.datastax.driver.mapping.annotations.UDT;

//@UDT(keyspace = "demo", name = "accountdetail")
public class AccountDetail implements Serializable{
	
	private Integer acnt_id;
	private String acc_number;
	private Integer employee_id;
	

	public Integer getAcnt_id() {
		return acnt_id;
	}
	public void setAcnt_id(Integer acnt_id) {
		this.acnt_id = acnt_id;
	}
	public String getAcc_number() {
		return acc_number;
	}
	public void setAcc_number(String acc_number) {
		this.acc_number = acc_number;
	}
	public Integer getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(Integer employee_id) {
		this.employee_id = employee_id;
	}
	
	

	 

}
