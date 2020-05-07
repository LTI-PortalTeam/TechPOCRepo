package com.priy.datatransfer.model.postgres;

import java.io.Serializable;
import java.util.Set;
 

public class EmployeeEntity implements Serializable {
 
    private static final long serialVersionUID = -1798070786993154676L;
 

    private Integer id;

    private String email;
    private String first_name;
    private String last_name;
    private Integer acnt_id;
    private String acc_number;
    private Integer employee_id;
    

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

	public String getAcc_number() {
		return acc_number;
	}

	public void setAcc_number(String acc_number) {
		this.acc_number = acc_number;
	}

	public Integer getAcnt_id() {
		return acnt_id;
	}

	public void setAcnt_id(Integer acnt_id) {
		this.acnt_id = acnt_id;
	}

	public Integer getEmployee_id() {
		return employee_id;
	}

	public void setEmployee_id(Integer employee_id) {
		this.employee_id = employee_id;
	}

	


 

}