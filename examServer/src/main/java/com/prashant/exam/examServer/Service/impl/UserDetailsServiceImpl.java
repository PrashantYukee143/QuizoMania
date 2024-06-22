package com.prashant.exam.examServer.Service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.prashant.exam.examServer.Entity.User;
import com.prashant.exam.examServer.Reopsitory.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user=this.userRepo.findByUsername(username);
		
		if(user==null)
		{
			System.out.println("User not Found");
			throw new UsernameNotFoundException("No user found");
		}
		
		return user;
	}

	
}