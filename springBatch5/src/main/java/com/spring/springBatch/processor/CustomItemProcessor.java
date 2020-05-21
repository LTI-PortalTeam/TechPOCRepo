/**
 * 
 */
package com.spring.springBatch.processor;

import org.springframework.batch.item.ItemProcessor;

import com.spring.springBatch.model.Customer;

/**
 * @author pgoel
 *
 */
public class CustomItemProcessor implements ItemProcessor<Customer, Customer>{

	/**
	 * 
	 */
	public CustomItemProcessor() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public Customer process(Customer item) throws Exception {
		if (item.getId() % 2 == 0) {
			return null;
		}
		return item;
	}

}
