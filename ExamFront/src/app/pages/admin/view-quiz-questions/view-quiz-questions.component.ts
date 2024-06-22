import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {

  qId:any;
  qTitle:any;
  questions: any[] = [];
  quiz: any;

  constructor(

    private _route: ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.questions=data;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  deleteQuestion(qid:any) {
    // Show a Swal confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this question',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes" in the Swal confirmation dialog, proceed with deletion
        this._question.deleteQuestion(qid).subscribe({
          next: (data: any) => {
            // Remove the deleted quiz from the quizzes array
            this._snack.open('Question Deleted','',{
              duration:3000,
            })
            this.questions = this.questions.filter((q) => q.quesId !== qid);
          },
          error: (error: any) => {
            Swal.fire('Error!', 'Error in deleting question!', 'error');
          }
        });
      }
    });
  }
}
