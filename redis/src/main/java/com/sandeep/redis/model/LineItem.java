package com.sandeep.redis.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("lineitems")
public class LineItem implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6914506465619760971L;

	@Id
	private Long Id;
	
	@Indexed
	private Long orderId;
	
	private String description;

	public LineItem(Long orderId, Long Id, String description) {
		this.Id = Id;
		this.description=description;
		this.orderId=orderId;
		
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "LineItem [Id=" + Id + ", orderId=" + orderId + ", description=" + description + "]";
	}
	
	
	
	
}
