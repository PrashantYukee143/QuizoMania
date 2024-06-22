import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {
  [x: string]: any;

  qid: any;
  questions: any[] = [];
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  timer:any;

  isSubmit=false;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe({
      next: (data: any) => {
        this.questions = data;
        this.timer=this.questions.length*2*60;
        console.log(this.questions);
        this.startTimer();
      },
      error: (error: any) => {
        Swal.fire('Error!!', 'Error in loading the data!!', 'error');
      }
    })
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz()
  {
    this._question.evalQuiz(this.questions).subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.marksGot =data.marksGot;
        this.correctAnswer = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;

        
      },
      error:(error:any)=>{
        console.log(error);
      }
    })
    // this.isSubmit=true;
    //     this.questions.forEach(q => {
    //       if (q.givenAnswer == q.answer) {
    //         this.correctAnswer++;
    //         let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length
    //         this.marksGot += marksSingle;
    //       }
    //       if(q.givenAnswer.trim()!='')
    //       {
    //         this.attempted++;
    //       }
    //     });
    //     console.log("correct answer: " + this.correctAnswer);
    //     console.log("Marks Got: " + this.marksGot);
    //     console.log("Attempted: "+ this.attempted);
  }

  printPage()
  {
    window.print();
  }

}
