package com.prashant.exam.examServer.Reopsitory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.exam.examServer.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByUsername(String userName);

//	public User findByEmail(String email);
//
//	public User userExistsByUsernameOrEmail(String username, String email);
	
}
