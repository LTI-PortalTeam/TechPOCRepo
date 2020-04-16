package com.activemq;


import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;
 
@Component
public class MessageReceiver {
 
    @JmsListener(destination = "MyQueue1")
    public void receiveMessage(String msg) 
    {
        System.out.println("Received " + msg );
    }
}