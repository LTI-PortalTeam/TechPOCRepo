package com.mongodbspring.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "employee")
public class Employee {
	@Id
	private String _id;
	
	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	private String firstname;
	
	private String lastname;

	public Employee()
	{
		super();
	}

	public Employee(String firstname, String lastname)
	{
		super();
		this.firstname = firstname;
		this.lastname = lastname;
	}

	public String getFirstname()
	{
		return firstname;
	}

	public void setFirstname(String firstname)
	{
		this.firstname = firstname;
	}

	public String getLastname()
	{
		return lastname;
	}

	public void setLastname(String lastname)
	{
		this.lastname = lastname;
	}

	@Override
	public String toString()
	{
		return "Employee [firstname=" + firstname + ", lastname=" + lastname + "]";
	}
}
