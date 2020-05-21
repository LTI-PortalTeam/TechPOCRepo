package com.spring.springBatch.components;

import org.springframework.batch.item.ItemProcessor;

/**
 * @author pgoel
 */
public class RetryItemProcessor implements ItemProcessor<String, String> {

	private boolean retry = false;
	private int attemptCount = 0;

	@Override
	public String process(String item) throws Exception {
		System.out.println("processing item " + item);
		if(retry && item.equalsIgnoreCase("33")) {// Fail 5 times on item #42
			attemptCount++;

			if(attemptCount >= 5) {
				System.out.println("Success!");
				retry = false;
				return String.valueOf(Integer.valueOf(item) * -1);
			}
			else {
				System.out.println("Processing of item - " + item + " failed");
				throw new CustomRetryableException("Processor failed.  Attempt#" + attemptCount);
			}
		}
		else {
			return String.valueOf(Integer.valueOf(item) * -1);
		}
	}

	public void setRetry(boolean retry) {
		this.retry = retry;
	}
}
