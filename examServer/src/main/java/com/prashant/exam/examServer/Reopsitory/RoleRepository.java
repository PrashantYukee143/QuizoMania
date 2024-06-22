package com.prashant.exam.examServer.Reopsitory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.exam.examServer.Entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
