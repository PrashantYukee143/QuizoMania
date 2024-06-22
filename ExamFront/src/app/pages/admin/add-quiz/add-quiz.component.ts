import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  categories: {
    cid: number;
    title: string;
    description: string;
  }[] = [];
  

  quizData = {
    title: '',
    description: '',
    maxMarks: 0,
    numberOfQuestions: 0,
    active: true,
    category:{
      cid:'',
    },
  };
  

  constructor(private _cat: CategoryService , private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error(error);
        Swal.fire('Error', 'An error occurred while loading data', 'error');
      }
    });
  }

  addQuiz()
  {
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
      this._snack.open('Title is required',"",{
        duration:3000
      })
      return; 
    }

    this._quiz.addQuiz(this.quizData).subscribe({
      next:(data:any)=>{
        this.quizData = {
          title: '',
          description: '',
          maxMarks: 0,
          numberOfQuestions: 0,
          active: true,
          category:{
            cid:'',
          },
          
        };
        Swal.fire('Success!!','Quiz is Added successfully','success')
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Something went wrong','error');
      }
    });
  }
}
