package com.oauth.springmvc.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.oauth.springmvc.model.User;
import com.oauth.springmvc.model.UserAuth;

@Repository("userDao")
@Transactional
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public List<User> findAllUsers() {
		String hql = "from User";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);

		@SuppressWarnings("unchecked")
		List<User> listUser = (List<User>) query.getResultList();

		if (listUser != null && !listUser.isEmpty()) {
			return listUser;
		}
		return null;
	}

	@Override
	public User findById(long id) {

		return sessionFactory.getCurrentSession().get(User.class, id);
	}

	@Override
	public User findByName(String name) {
		String hql = "from User where name = ?";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter(0, name);
		try {
			User user = (User) query.getSingleResult();
			System.out.println("user" + user.getName());
			if (user != null) {
				return user;
			}
		}

		catch (NoResultException nre) {
		}
		return null;
	}

	@Override
	public void deleteUserById(long id) {
		Session session = sessionFactory.getCurrentSession();
		User user = session.byId(User.class).load(id);
		session.delete(user);
	}

	@Override
	public long saveUser(User user) {
		sessionFactory.getCurrentSession().save(user);
		System.out.println("New user Created Sucessfully:" + user);
		return user.getId();
	}

	@Override
	public void updateUser(User user) {
		Session session = sessionFactory.openSession();
		user.setId(user.getId());
		user.setName(user.getName());
		user.setAge(user.getAge());
		user.setSalary(user.getSalary());
		session.beginTransaction();
		session.update(user);
		session.getTransaction().commit();
		session.close();
		System.out.println("Update user details:" + user);
	}

	@Override
	public void deleteAllUsers() {
		sessionFactory.getCurrentSession().createQuery("delete from User").executeUpdate();
	}

	@Override
	public UserAuth findByUserName(String userName) {
		String hql = "from UserAuth where userName = ?";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter(0, userName);

		UserAuth user = (UserAuth) query.getSingleResult();
		System.out.println("user fetched successfully>>>>>>>>>>>>>>>>>>>>>>>>" + user.getUserName());
		if (user != null) {
			return user;
		}
		return null;
	}
}
