/**
 * 
 */
package com.spring.springBatch.reader;

import java.util.Iterator;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

/**
 * @author pgoel
 *
 */
public class StatelessItemReader implements ItemReader<String>{

	private final Iterator <String> data;
	
	/**
	 * 
	 */
	public StatelessItemReader(List<String> data) {
		this.data = data.iterator();
	}

	@Override
	public String read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
		if (this.data.hasNext()) 
			return data.next();
		else
			return null; // null has to be returned to stop the flow otherwise it becomes never ending
	}

}
