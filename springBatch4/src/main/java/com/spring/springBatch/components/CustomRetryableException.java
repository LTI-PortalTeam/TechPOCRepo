package com.spring.springBatch.components;

/**
 * @author pgoel
 */
public class CustomRetryableException extends Exception {

	public CustomRetryableException() {
		super();
	}

	public CustomRetryableException(String msg) {
		super(msg);
	}
}
