import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {
  public Editor = ClassicEditor;
  questionId=0;
  question: any = {
    content: '', // Initialize properties with default values or empty strings
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService
  ) {}

  ngOnInit() {
    // Get the question ID from the route parameter
    this.questionId =this._route.snapshot.params['quesId']; // Use the "+" to convert it to a number

    // Load the current question details using your question service
    this.loadQuestionDetails();
  }

  loadQuestionDetails() {
    this._question.getQuestionById(this.questionId).subscribe({
      next: (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  updateQuestion() {
    this._question.updateQuestion(this.question).subscribe({
      next: (data: any) => {
        Swal.fire('Success!!', 'Question updated', 'success');
        console.log(this.question);
        this._router.navigate([`admin/view-questions/${this.question.quiz.qId}/${this.question.quiz.title}`]);
        // Redirect to a different page or handle as needed
        // this._router.navigate(['/admin/questions']); // Example navigation
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    });
  }
}
