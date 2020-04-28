package com.oauth.springmvc.dao;

import java.util.List;

import com.oauth.springmvc.model.User;
import com.oauth.springmvc.model.UserAuth;

public interface UserDao {
	List<User> findAllUsers();

	User findById(long id);

	void deleteUserById(long id);

	long saveUser(User user);

	void updateUser(User user);

	void deleteAllUsers();

	public UserAuth findByUserName(String userName);

	User findByName(String name);
}
