import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {

  constructor(
    private _route:ActivatedRoute , 
    private _quiz:QuizService, 
    private _cat:CategoryService,
    private _snack:MatSnackBar,
    private _router:Router){}

  qId=0;
  quiz: any;
  categories: any;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe({
      next:(data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });

    this._cat.categories().subscribe({
      next:(data:any)=>{
        this.categories=data;
        console.log(this.quiz);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Error in loading the data!','error')
      }
    });
  }

  updateData()
  {
    // if(this.quiz.title.trim()=='' || this.quiz.title==null)
    // {
    //   this._snack.open('Title is required',"",{
    //     duration:3000
    //   })
    //   return; 
    // }

    this._quiz.updateQuiz(this.quiz).subscribe({
      next:(data:any)=>{
        Swal.fire('Success!!','Quiz updated','success')
        this._router.navigate(['/admin/quizzes']);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Something went wrong','error');
      }
    });
  }
}
