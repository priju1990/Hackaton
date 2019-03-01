package com.hacker.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication @Configuration @EnableAutoConfiguration @ComponentScan({"com.hacker.mail"})
public class MailerApplication implements ApplicationRunner {

    private static Logger log = LoggerFactory.getLogger(MailerApplication.class);

  

    public static void main(String[] args) throws Exception {
        SpringApplication.run(MailerApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
    
    }
}
