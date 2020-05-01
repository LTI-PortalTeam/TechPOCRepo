package com.spring.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
    private BCryptPasswordEncoder passwordEncoder;
	
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
    	
    	clients.inMemory()
         .withClient("javainuse").secret(passwordEncoder.encode("secret"))
         .authorizedGrantTypes("authorization_code")
         .authorities("CLIENT")
         .scopes("read")
         .redirectUris("http://localhost:8090/showEmployees");
    	
       /* clients.inMemory().withClient("javainuse").secret("secret").authorizedGrantTypes("authorization_code")
            .scopes("read").authorities("CLIENT");*/
    }
}
