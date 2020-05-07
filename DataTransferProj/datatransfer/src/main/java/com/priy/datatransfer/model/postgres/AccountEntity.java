package com.priy.datatransfer.model.postgres;

import java.io.Serializable;

//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.ManyToOne;
//import javax.persistence.Table;
//import javax.persistence.UniqueConstraint;
// 
//@Entity(name = "ForeignKeyAssoAccountEntity")
//@Table(name = "ACCOUNT", uniqueConstraints = {
//@UniqueConstraint(columnNames = "ID")})
public class AccountEntity implements Serializable
{
    private static final long serialVersionUID = -6790693372846798580L;
 
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "ID", unique = true, nullable = false)
    private String acc_num;
 
    //@Column(name = "ACC_NUMBER", unique = true, nullable = false, length = 100)
    private Integer employee_id;

	public String getAcc_num() {
		return acc_num;
	}

	public void setAcc_num(String acc_num) {
		this.acc_num = acc_num;
	}

	public Integer getEmployee_id() {
		return employee_id;
	}

	public void setEmployee_id(Integer employee_id) {
		this.employee_id = employee_id;
	}
 
  //  @ManyToOne
   // private EmployeeEntity employee;

	
    
}