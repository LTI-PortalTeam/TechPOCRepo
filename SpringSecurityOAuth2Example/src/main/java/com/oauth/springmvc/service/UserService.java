package com.oauth.springmvc.service;

import java.util.List;

import com.oauth.springmvc.model.User;

public interface UserService {

	User findById(long id);

	long saveUser(User user);

	void updateUser(User user);

	void deleteUserById(long id);

	List<User> findAllUsers();

	void deleteAllUsers();

	public boolean isUserExist(User user);

}
