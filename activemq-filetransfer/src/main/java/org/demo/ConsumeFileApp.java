package org.demo;

import java.util.Scanner;

import javax.jms.JMSException;

import org.demo.activemq.QueueMessageConsumer;
import org.demo.activemq.QueueMessageProducer;

public class ConsumeFileApp {

	public static void main(String[] args) {

		QueueMessageConsumer queueMsgListener = new QueueMessageConsumer(Constants.TEST_BROKER_URL, Constants.ADMIN,
				Constants.ADMIN);
		queueMsgListener.setDestinationName(Constants.TEST_QUEUE);

		try {
			queueMsgListener.run();

		} catch (JMSException e) {
			e.printStackTrace();
		}
		
		
		try {

			QueueMessageProducer queProducer = new QueueMessageProducer(Constants.TEST_BROKER_URL, Constants.ADMIN,
					Constants.ADMIN);

			System.out.println("Enter message type for transferring file:"
					+ "\n\t1 - File as BytesMessage \n\t2 - File as BlobMessage");
			try (Scanner scanIn = new Scanner(System.in)) {
				String inputFileType = scanIn.nextLine();
				switch (inputFileType) {
				case "1":
					queProducer.sendBytesMessages(Constants.TEST_QUEUE);
					break;
				case "2":
					queProducer.sendBlobMessages(Constants.TEST_QUEUE);
					break;
				default:
					System.out.println("Wrong input");
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
