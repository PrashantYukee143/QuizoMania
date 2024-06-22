package com.prashant.exam.examServer.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.exam.examServer.Entity.exam.Questions;
import com.prashant.exam.examServer.Entity.exam.Quiz;
import com.prashant.exam.examServer.Service.QuestionService;
import com.prashant.exam.examServer.Service.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;

	@Autowired
	private QuizService quizService;

	@PostMapping("/")
	public ResponseEntity<Questions> addQuestion(@RequestBody Questions question) {
		Questions question_1 = this.questionService.addQuestion(question);

		return ResponseEntity.ok(question_1);
	}

	@GetMapping("/{questionId}")
	public Questions getQuestion(@PathVariable("questionId") Long questionId) {
		return this.questionService.getQuestion(questionId);
	}

	@GetMapping("/")
	public ResponseEntity<?> getQuestions() {
		return ResponseEntity.ok(this.questionService.getQuestions());
	}

	@PutMapping("/")
	public Questions updateQuestion(@RequestBody Questions question) {
		return this.questionService.updateQuestion(question);
	}

	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {
//		Quiz quiz=new Quiz();
//		quiz.setqId(qid);
//		Set<Questions> questionOfQuiz=this.questionService.getQuestionsOfQuiz(quiz);
//		
//		return ResponseEntity.ok(questionOfQuiz);

		Quiz quiz = this.quizService.getQuiz(qid);
		Set<Questions> questions = quiz.getQuestions();
		List<Questions> list = new ArrayList<>(questions); // Specify the generic type
		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
			list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions() + 1)); // Remove the +1 here
		}
		
		list.forEach((q)->{
			q.setAnswer("");
		});
		Collections.shuffle(list);
		return ResponseEntity.ok(list);

	}

	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
		Quiz quiz = new Quiz();
		quiz.setqId(qid);
		Set<Questions> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);

		return ResponseEntity.ok(questionOfQuiz);
//		
//		Quiz quiz = this.quizService.getQuiz(qid);
//		Set<Questions> questions = quiz.getQuestions();
//		List<Questions> list = new ArrayList<>(questions); // Specify the generic type
//		if (list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
//		    list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1)); // Remove the +1 here
//		}
//		Collections.shuffle(list);
//		return ResponseEntity.ok(list);

	}

	@DeleteMapping("/{questionId}")
	public void deleteQuestion(@PathVariable("questionId") Long questionId) {
		this.questionService.deleteQuestion(questionId);
	}

	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Questions> questions) {
		System.out.println(questions);
		double marksGot = 0;
		int correctAnswers = 0;
		int attempted = 0;
		for (Questions q : questions) {

			Questions question = this.questionService.get(q.getQuesId());

			if (question.getAnswer().equals(q.getGivenAnswer())) {
				// correct

				correctAnswers++;

				double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
				// this.questions[0].quiz.maxMarks / this.questions.length;
				marksGot += marksSingle;

			}
			if (q.getGivenAnswer() != null) {
				attempted++;
			}

		}
		Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);
        return ResponseEntity.ok(map);
	}
}
