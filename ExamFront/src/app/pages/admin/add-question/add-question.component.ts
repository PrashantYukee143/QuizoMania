import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  public Editor = ClassicEditor;
  qId:any;
  qTitle:any
  question={
    quiz:{
      qId: 0
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar
    ){}

    public config = {
      toolbar: ['heading', '|', 'bold', 'italic', 'link', 'image'],
      image: {
        toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side'],
      },
    };

  ngOnInit():void{
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId; 
        // console.log(this.qId)
  }

  submit()
  {
    if(this.question.content.trim()=='' || this.question.content==null &&
    this.question.option1.trim()=='' || this.question.option1==null &&
    this.question.option2.trim()=='' || this.question.option2==null &&
    this.question.option3.trim()=='' || this.question.option3==null &&
    this.question.option4.trim()=='' || this.question.option4==null)
    {
      this._snack.open('Fields are required',"",{
        duration:3000
      })
      return; 
    }

    this._question.addQuestion(this.question).subscribe({
      next:(data:any)=>{
        Swal.fire('Success!!','Question is Added successfully','success')
        this.resetForm();
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Something went wrong','error');
      }
    });
  }
  resetForm() {
    this.question = {
      quiz: { qId: this.qId },
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
    };
  }
  
}
