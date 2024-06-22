package com.prashant.exam.examServer.Service;

import java.util.Set;

import com.prashant.exam.examServer.Entity.User;
import com.prashant.exam.examServer.Entity.UserRole;

public interface UserService {

	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	public User getUser(String username);
	public void deleteUser(long userId);
}
