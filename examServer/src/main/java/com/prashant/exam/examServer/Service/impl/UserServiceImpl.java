package com.prashant.exam.examServer.Service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.exam.examServer.Entity.User;
import com.prashant.exam.examServer.Entity.UserRole;
import com.prashant.exam.examServer.Reopsitory.RoleRepository;
import com.prashant.exam.examServer.Reopsitory.UserRepository;
import com.prashant.exam.examServer.Service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	// Creating User
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {

		User local = this.userRepository.findByUsername(user.getUsername());

		if (local != null) {
			System.out.println("User is Already created");
			throw new Exception("USER ALREADY EXISTS!!");
		} else {
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}

			user.getUserRole().addAll(userRoles);
			local = this.userRepository.save(user);
		}

		return local;
	}

	// get user by Username
	@Override
	public User getUser(String username) {

		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(long userId) {
		this.userRepository.deleteById(userId);
	}
}
