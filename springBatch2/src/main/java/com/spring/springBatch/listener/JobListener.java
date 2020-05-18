/**
 * 
 */
package com.spring.springBatch.listener;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
/**
 * @author pgoel
 *
 */
public class JobListener implements JobExecutionListener {

	private JavaMailSender jms;
	/**
	 * 
	 */
	public JobListener(JavaMailSender sender) {
		this.jms = sender;
	}

	@Override
	public void beforeJob(JobExecution jobExecution) {
		String jobName = jobExecution.getJobInstance().getJobName();
		
		SimpleMailMessage mail = getSimpleMailMessage(String.format("%s is starting", jobName), 
				String.format("This is just to inform that %s is starting", jobName));
		jms.send(mail);
	}

	@Override
	public void afterJob(JobExecution jobExecution) {
		String jobName = jobExecution.getJobInstance().getJobName();
		
		SimpleMailMessage mail = getSimpleMailMessage(String.format("%s has completed", jobName), 
				String.format("This is just to inform that %s has completed", jobName));
		jms.send(mail);

	}
	
	private SimpleMailMessage getSimpleMailMessage(String subject, String text) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo("peyush_goel@hotmail.com");
		mail.setSubject("subject");
		mail.setText(text);
		
		return mail;
	}

}
