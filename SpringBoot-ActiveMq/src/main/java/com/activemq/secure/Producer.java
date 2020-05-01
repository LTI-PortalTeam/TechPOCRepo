package com.activemq.secure;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.ScheduledMessage;
import org.apache.activemq.command.ActiveMQQueue;

import javax.jms.*;

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

            Session session = connection.createSession(NON_TRANSACTED, Session.CLIENT_ACKNOWLEDGE);
           // Destination destination = session.createQueue("CompositeQueue");
           // Destination destination1 = session.createQueue("kk2");
            Destination destination = session.createQueue("Com");
            MessageProducer producer = session.createProducer(destination);
            

            for (int i = 0; i < NUM_MESSAGES_TO_SEND; i++) {
                TextMessage message = session.createTextMessage("Message Dharmendra123 " + i);
                System.out.println("Sending message #" + i);
                
                //setting delay in the message
                long time = 20 * 1000;
  //              message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY, time);
                message.setStringProperty(ScheduledMessage.AMQ_SCHEDULED_CRON, "* * * * *");
                
                producer.send(message);
//              producer.send(destination1, message);
            }
            
            
            //Client side Composite destinations creation
            
			/*
			 * MessageProducer producer = session.createProducer(null);
			 * 
			 * for (int i = 0; i < NUM_MESSAGES_TO_SEND; i++) { TextMessage message =
			 * session.createTextMessage("Message Dharmendra123 " + i);
			 * System.out.println("Sending message #" + i);
			 * 
			 * Queue queue = new ActiveMQQueue("P1,P2,P3"); producer.send(queue, message);
			 * 
			 * // Thread.sleep(DELAY); }
			 */

            producer.close();
            session.close();

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