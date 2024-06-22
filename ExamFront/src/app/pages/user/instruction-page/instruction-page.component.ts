import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.css']
})
export class InstructionPageComponent {

  qId: any;
  quiz:any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    console.log(this.qId);

    this._quiz.getQuiz(this.qId).subscribe({
      next: (data: any) => {
        // Assuming 'data' is an object with the expected structure
        this.quiz = data;
        console.log(this.quiz);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data!!', 'error');
      }
    });
  }

  startQuiz() {
    if (this.quiz) { // Check if 'quiz' is not null
      Swal.fire({
        title: 'Do you want to start the Quiz?',
        showCancelButton: true,
        confirmButtonText: 'Start',
        icon: 'info'
      }).then((result) => {
        if (result.isConfirmed) {
          this._router.navigate(['/start/' + this.qId]);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } else {
      console.error('Quiz data is not available.');
    }
  }
}
