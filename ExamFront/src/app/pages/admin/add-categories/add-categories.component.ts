import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  category={
    title:'',
    description:'',
  };

  constructor(private _category:CategoryService ,private _snack:MatSnackBar){}

  submit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this._snack.open('Title is required',"",{
        duration:3000
      })
      return; 
    }

    this._category.addCategory(this.category).subscribe({
      next:(data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire('Success!!','Category is Added successfully','success')
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Something went wrong','error');
      }
    });
  }
}
