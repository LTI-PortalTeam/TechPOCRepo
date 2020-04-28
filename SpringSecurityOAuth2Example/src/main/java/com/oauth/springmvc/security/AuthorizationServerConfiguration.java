package com.oauth.springmvc.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {

	private static String REALM="MY_OAUTH_REALM";

	@Autowired
	@Qualifier("authenticationManagerBean")
	private AuthenticationManager authenticationManager;
	
	  @Autowired
	  UserDetailsService userDetailsService;

	  @Override
	  public void configure(final AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
	    oauthServer.tokenKeyAccess("permitAll()")
	    .checkTokenAccess("isAuthenticated()")
	    .realm(REALM+"/client");
	  }
	  @Override
	  public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
	    clients.inMemory()
	      .withClient("my-trusted-client")
	      .secret("{noop}secret")
	      .authorizedGrantTypes("password", "authorization_code", "refresh_token", "implicit")
	      .scopes("read", "write", "trust")
	      .autoApprove(true)
	      .accessTokenValiditySeconds(900)//Access token is only valid for 0.25 Hour/15 minutes.
	      .refreshTokenValiditySeconds(4500);//Refresh token is only valid for 12.5 Hours/750 minutes.
	  }
	
	@Override
	  public void configure(final AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
	    endpoints.tokenStore(tokenStore()).authenticationManager(authenticationManager)
	    	.accessTokenConverter(defaultAccessTokenConverter())
	    	.userDetailsService(userDetailsService);
	  }
	  @Bean
	  public TokenStore tokenStore(){
	    return new JwtTokenStore(defaultAccessTokenConverter());
	  }
	  @Bean
	  public JwtAccessTokenConverter defaultAccessTokenConverter() {
	    JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
	    converter.setSigningKey("123");
	    return converter;
	  }

}