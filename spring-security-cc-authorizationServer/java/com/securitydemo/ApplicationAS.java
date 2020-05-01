package com.securitydemo;

import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableResourceServer
@SpringBootApplication
@Configuration
public class ApplicationAS {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationAS.class, args);
	}

    //This method will be used to check if the user has a valid token to access the resource
	@RequestMapping("/validateUser")
	public Principal user(Principal user) {
		return user;
	}
	//for password grant type
	/*@Configuration
	protected static class AuthenticationManagerConfiguration extends GlobalAuthenticationConfigurerAdapter {

		@Override
		public void init(AuthenticationManagerBuilder auth) throws Exception {
			auth.inMemoryAuthentication().withUser("javainuse-user").password("javainuse-pass").roles("USER");
		}

	}*/
}
