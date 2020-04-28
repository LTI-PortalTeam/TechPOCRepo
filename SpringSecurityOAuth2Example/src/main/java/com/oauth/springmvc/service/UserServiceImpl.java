package com.oauth.springmvc.service;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.oauth.springmvc.dao.UserDao;
import com.oauth.springmvc.model.User;
import com.oauth.springmvc.model.UserAuth;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserDao userDao;

	public List<User> findAllUsers() {
		return userDao.findAllUsers();
	}

	public User findById(long id) {

		return userDao.findById(id);
	}

	public long saveUser(User user) {
		return userDao.saveUser(user);
	}

	public void updateUser(User user) {
		userDao.updateUser(user);
	}

	public void deleteUserById(long id) {

		userDao.deleteUserById(id);
	}

	public boolean isUserExist(User user) {
		return userDao.findByName(user.getName()) != null;
	}

	public void deleteAllUsers() {
		userDao.deleteAllUsers();
	}

	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		UserAuth user = userDao.findByUserName(userName);
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(user.getUserName(), "{noop}" + user.getPassword(),
				getAuthority());
	}

	private List getAuthority() {
		return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}
}
