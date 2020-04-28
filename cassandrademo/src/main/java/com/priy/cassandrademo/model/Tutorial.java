package com.priy.cassandrademo.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table
public class Tutorial {
	@PrimaryKey
	private UUID id;

	private String title;
	private String description;
	private boolean published;
	private List<String> email;
	private Set<BigDecimal> phone;
	private Map<String,String> course;

	public Tutorial(UUID id, String title, String description, boolean published, List<String> email,
			Set<BigDecimal> phone, Map<String, String> course) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.published = published;
		this.email = email;
		this.phone = phone;
		this.course = course;
	}

	public Tutorial() {

	}

	public Tutorial(UUID id, String title, String description, boolean published, List<String> email) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.published = published;
		this.email = email;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isPublished() {
		return published;
	}

	public void setPublished(boolean isPublished) {
		this.published = isPublished;
	}

	public List<String> getEmail() {
		return email;
	}

	public void setEmail(List<String> email) {
		this.email = email;
	}
	
	

	public Set<BigDecimal> getPhone() {
		return phone;
	}

	public void setPhone(Set<BigDecimal> phone) {
		this.phone = phone;
	}

	public Map<String, String> getCourse() {
		return course;
	}

	public void setCourse(Map<String, String> course) {
		this.course = course;
	}

	@Override
	public String toString() {
		return "Tutorial [id=" + id + ", title=" + title + ", desc=" + description + ", published=" + published + "]";
	}
}
