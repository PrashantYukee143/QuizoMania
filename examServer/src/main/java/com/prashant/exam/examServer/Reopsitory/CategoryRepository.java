package com.prashant.exam.examServer.Reopsitory;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.exam.examServer.Entity.exam.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{

}
