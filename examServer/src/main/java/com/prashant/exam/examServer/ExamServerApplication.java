package com.prashant.exam.examServer;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.prashant.exam.examServer.Entity.Role;
import com.prashant.exam.examServer.Entity.User;
import com.prashant.exam.examServer.Entity.UserRole;
import com.prashant.exam.examServer.Helper.UserFoundException;
import com.prashant.exam.examServer.Service.UserService;
import com.prashant.exam.examServer.Service.impl.UserDetailsServiceImpl; // Import the UserDetailsServiceImpl

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ExamServerApplication.class, args);
    }

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDetailsServiceImpl userDetailsService; // Inject the UserDetailsServiceImpl

    @Override
    public void run(String... args) throws Exception {
        try {
            System.out.println("Starting");

            // Check if a user with the same username already exists
            User existingUser = null;
            try {
                existingUser = (User) userDetailsService.loadUserByUsername("prashantkarn143");
            } catch (Exception e) {
                // User not found, which is expected
            }

            if (existingUser == null) {
                // User doesn't exist, so create a new one
                User user = new User();
                user.setFirstName("Prashant");
                user.setLastname("karn");
                user.setUsername("prashantkarn143");
                user.setPassword(this.bCryptPasswordEncoder.encode("Prashant@2002"));
                user.setEmail("acoustickarn007@gmail.com");
                user.setProfile("picture.png");

                Role role = new Role();
                role.setRoleId(45L);
                role.setRoleName("Admin");

                Set<UserRole> userRoleSet = new HashSet<>();
                UserRole userRole = new UserRole();
                userRole.setUser(user);
                userRole.setRole(role);
                userRoleSet.add(userRole);

                User user1 = userService.createUser(user, userRoleSet);

                System.out.println("User created: " + user1.getUsername());
            } else {
                System.out.println("User with the same username already exists.");
                // Handle the situation (e.g., update the existing user or show an error message)
            }
        } catch (UserFoundException e) {
            e.printStackTrace();
            System.err.println("UserFoundException occurred: " + e.getMessage());
        }
    }
}
