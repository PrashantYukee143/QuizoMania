package com.prashant.exam.examServer.Service;

import java.util.Set;

import com.prashant.exam.examServer.Entity.exam.Questions;
import com.prashant.exam.examServer.Entity.exam.Quiz;

public interface QuestionService {

	public Questions addQuestion(Questions question);
	
	public Questions updateQuestion(Questions question);
	
	public Set<Questions> getQuestions();
	
	public Questions getQuestion(Long questionId);
	
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz);
	
	public  void deleteQuestion(Long questionId);
	
	public Questions get(Long questionId);
}
