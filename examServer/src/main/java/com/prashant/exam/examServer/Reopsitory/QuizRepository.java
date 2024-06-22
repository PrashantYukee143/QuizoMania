package com.prashant.exam.examServer.Reopsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.exam.examServer.Entity.exam.Category;
import com.prashant.exam.examServer.Entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	public List<Quiz> findBycategory(Category category);
	
	public List<Quiz> findByActive(Boolean b);
	
	public List<Quiz> findByCategoryAndActive(Category category,Boolean b);
}
