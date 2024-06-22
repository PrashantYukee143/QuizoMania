package com.prashant.exam.examServer.Service.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.exam.examServer.Entity.exam.Questions;
import com.prashant.exam.examServer.Entity.exam.Quiz;
import com.prashant.exam.examServer.Reopsitory.QuestionsRepository;
import com.prashant.exam.examServer.Service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionsRepository questionRepo;
	
	@Override
	public Questions addQuestion(Questions question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Questions updateQuestion(Questions question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Set<Questions> getQuestions() {
		return new HashSet<>(this.questionRepo.findAll());
	}

	@Override
	public Questions getQuestion(Long questionId) {
		return this.questionRepo.findById(questionId).get();
	}

	@Override
	public Set<Questions> getQuestionsOfQuiz(Quiz quiz) {
	
		return this.questionRepo.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long questionId) {

        Questions question = new Questions();
        question.setQuesId(questionId);
        this.questionRepo.delete(question);
		
		
	}

	@Override
	public Questions get(Long questionId) {
		// TODO Auto-generated method stub
		  Optional<Questions> questionOptional = this.questionRepo.findById(questionId);
		    
		    // Check if the question with the given ID exists
		    if (questionOptional.isPresent()) {
		        return questionOptional.get();
		    } else {
		        // Handle the case where the question doesn't exist
		        // You can throw an exception or return a default value, depending on your needs
		        return null; // This is just an example; you may want to handle it differently
		    }
	}
	
	
	
}
