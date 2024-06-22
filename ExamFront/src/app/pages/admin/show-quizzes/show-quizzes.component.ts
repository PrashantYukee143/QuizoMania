import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css']
})
export class ShowQuizzesComponent {

  quizzes: {
    qId: number;
    title: string;
    description: string;
    maxMarks: number;
    numberOfQuestions: number;
    active:false;
    category: {
      cid: number;
      title: string; // Add the 'title' property here
      description: string;
    };
  }[] = [];



  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    });
  }

  deleteQuiz(qId: any) {
    // Show a Swal confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this quiz!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes" in the Swal confirmation dialog, proceed with deletion
        this._quiz.deleteQuiz(qId).subscribe({
          next: (data: any) => {
            // Remove the deleted quiz from the quizzes array
            const index = this.quizzes.findIndex(quiz => quiz.qId === qId);
            if (index !== -1) {
              this.quizzes.splice(index, 1);
            }
  
            Swal.fire('Success!', 'Quiz deleted!', 'success');
          },
          error: (error: any) => {
            Swal.fire('Error!', 'Error in deleting quiz!', 'error');
          }
        });
      }
    });
  }



}
