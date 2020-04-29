package com.sandeep.redis.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Reference;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("orders")
public class Order implements Serializable{

	private static final long serialVersionUID = 2566806456003396673L;
	
	@Id
	private Long id;
	
	@Indexed
	private Date when;
	
	@Reference
	List<LineItem> lineItems;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getWhen() {
		return when;
	}

	public void setWhen(Date when) {
		this.when = when;
	}

	public List<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	public Order(Long id, Date when, List<LineItem> lineItems) {
		super();
		this.id = id;
		this.when = when;
		this.lineItems = lineItems;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", when=" + when + ", lineItems=" + lineItems + "]";
	}
	
	

}
