import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

  catId:any;
  quizzes:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
  ){}

  ngOnInit():void{
    this.catId=this._route.snapshot.params['catId'];
    console.log(this.catId)

    this._route.params.subscribe({
      next:(params)=>{
        this.catId=params['catId'];
        if(this.catId==0)
        {
          this._quiz.getActiveQuizzes().subscribe({
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
        else{
          console.log('load the specific quiz')
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe({
            next:(data:any)=>{
              this.quizzes=data;
            },
            error:(error:any)=>
            {
              Swal.fire('Error !', 'Error in loading data !', 'error');
            }
          });
        }
      }
    })
  }
}
