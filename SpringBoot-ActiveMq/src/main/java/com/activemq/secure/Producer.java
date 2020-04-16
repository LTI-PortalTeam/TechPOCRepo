package com.activemq.secure;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class Producer {
    private static final String BROKER_URL = "tcp://localhost:61616";
    private static final Boolean NON_TRANSACTED = false;
    private static final int NUM_MESSAGES_TO_SEND = 2;
    private static final long DELAY = 100;

    public static void main(String[] args) {
        String url = BROKER_URL;
        if (args.length > 0) {
            url = args[0].trim();
        }
        ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(url);
        Connection connection = null;

        try {

			connection = connectionFactory.createConnection( "admin", "password");
            connection.start();

            Session session = connection.createSession(NON_TRANSACTED, Session.CLIENT_ACKNOWLEDGE);
            Destination destination = session.createQueue("StompQueue");
            MessageProducer producer = session.createProducer(destination);

            for (int i = 0; i < NUM_MESSAGES_TO_SEND; i++) {
                TextMessage message = session.createTextMessage("Message Stomp " + i);
                System.out.println("Sending message #" + i);
                producer.send(message);
//                Thread.sleep(DELAY);
            }

            producer.close();
            session.close();

        } catch (Exception e) {
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