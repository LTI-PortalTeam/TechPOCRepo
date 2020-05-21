/**
 * 
 */
package com.spring.springBatch.domain;

import org.springframework.batch.item.validator.ValidationException;
import org.springframework.batch.item.validator.Validator;

import com.spring.springBatch.model.Customer;

/**
 * @author pgoel
 *
 */
public class CustomerValidator implements Validator<Customer>{

	@Override
	public void validate(Customer value) throws ValidationException {
		if (value.getFirstName().toLowerCase().startsWith("a")) {
			throw new ValidationException("Invalid name. Should not start with 'a' : " + value.getFirstName());
		}
	}

}
