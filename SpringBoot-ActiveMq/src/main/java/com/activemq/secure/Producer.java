package com.activemq.secure;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

import javax.jms.Connection;
import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.ActiveMQSession;
import org.apache.activemq.BlobMessage;
import org.apache.activemq.command.ActiveMQBlobMessage;

public class Producer {
    private static final String BROKER_URL = "tcp://localhost:61616";
    private static final Boolean NON_TRANSACTED = false;
    private static final int NUM_MESSAGES_TO_SEND = 1;
    private static final long DELAY = 100;

    public static void main(String[] args) {
        String url = BROKER_URL;
        if (args.length > 0) {
            url = args[0].trim();
        }
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);
        Connection connection = null;

        try {

			connection = connectionFactory.createConnection(/* "admin", "password" */);
            connection.start();

//            Session session = connection.createSession(NON_TRANSACTED, Session.CLIENT_ACKNOWLEDGE);
            //Destination destination = session.createQueue("kk1");
//            Destination destination1 = session.createQueue("kk2");
      //      MessageProducer producer = session.createProducer(destination);

			/*
			 * for (int i = 0; i < NUM_MESSAGES_TO_SEND; i++) { TextMessage message =
			 * session.createTextMessage("Message Dharmendra123 " + i);
			 * System.out.println("Sending message #" + i); producer.send(destination,
			 * message);
			 * 
			 * 
			 * 
			 * // producer.send(destination1, message); // Thread.sleep(DELAY); 
			 * }
			 */
            for (int i = 0; i < NUM_MESSAGES_TO_SEND; i++) {
            	
            	File file = File.createTempFile("amq-data-file-", ".dat");
            	String content = "hello world " + System.currentTimeMillis();
            	BufferedWriter writer = new BufferedWriter(new FileWriter(file));
            	writer.append(content);
            	writer.close();
            	
//            	ActiveMQBlobMessage message = (ActiveMQBlobMessage) ((ActiveMQSession) session).createBlobMessage(new File("D:\\BlobTest\\Sample.txt"));
            	
            	ActiveMQSession session = (ActiveMQSession) connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
            	Destination destination = session.createQueue("kk");
	        	   MessageProducer producer = session.createProducer(destination);
//	        	   MessageConsumer consumer = session.createConsumer(destination);
	        	   BlobMessage message = session.createBlobMessage(file);
	        	   message.setName("fileName");

            	   producer.send(message);
            	
           		producer.close();
                    session.close();
            }

            

        } catch (Exception e) {
        	e.printStackTrace();
            System.out.println("Caught exception!");
        }
        finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException e) {
                    System.out.println("Could not close an open connection...");
                }
            }
        }
    }

}