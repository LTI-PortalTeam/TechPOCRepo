package com.priy.datatransfer.model.postgres;

import java.io.Serializable;
import java.text.MessageFormat;

import com.datastax.driver.mapping.annotations.UDT;

//@UDT(keyspace = "demo", name = "account")
public class Account implements Serializable{

	private Integer id;
	private String acc_number;
	private Integer employee_id;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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
	
    @Override
    public String toString() {
        return MessageFormat.format("Account'{'id={0}, accountNumber=''{1}'',employeeId={2}'}'", id, acc_number, employee_id);
    }

	
	
}
