package com.prashant.exam.examServer.Reopsitory;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.exam.examServer.Entity.exam.Questions;
import com.prashant.exam.examServer.Entity.exam.Quiz;

public interface QuestionsRepository extends JpaRepository<Questions, Long>{

	Set<Questions> findByQuiz(Quiz quiz);

}
