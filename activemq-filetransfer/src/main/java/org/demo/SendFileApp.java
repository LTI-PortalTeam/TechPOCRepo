package org.demo;

import java.util.Scanner;

import org.demo.activemq.QueueMessageProducer;

public class SendFileApp {

	public static void main(String[] args) {
		try {

			QueueMessageProducer queProducer = new QueueMessageProducer(Constants.TEST_BROKER_URL, Constants.ADMIN,
					Constants.ADMIN);

			/*System.out.println("Enter message type for transferring file:"
					+ "\n\t1 - File as BytesMessage \n\t2 - File as BlobMessage");
			try (Scanner scanIn = new Scanner(System.in)) {
				String inputFileType = scanIn.nextLine();
				switch (inputFileType) {
				case "1":*/
					queProducer.sendBytesMessages(Constants.TEST_QUEUE);
					/*
					 * break; case "2": queProducer.sendBlobMessages(Constants.TEST_QUEUE); break;
					 * default: System.out.println("Wrong input"); } }
					 */

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
