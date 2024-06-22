import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {

  categories: Array<{ title: string, description: string, cid:number }> = [];

  constructor(private _category:CategoryService,
    private _snack:MatSnackBar,
    ){}

  ngOnInit(): void {
    this._category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      error: (error:any) => {
        console.log(error);
        Swal.fire('Error','Error in loading the data','error');
      }
    });
  }

  // deleteCategory(categoryId:any)
  // {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this question',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // User clicked "Yes" in the Swal confirmation dialog, proceed with deletion
  //       this._category.deleteCategory(categoryId).subscribe({
  //         next: (data: any) => {
  //           // Remove the deleted quiz from the quizzes array
  //           this._snack.open('Category Deleted','',{
  //             duration:3000,
  //           })
  //           this.categories = this.categories.filter((c) => c.cid !== categoryId);
  //         },
  //         error: (error: any) => {
  //           Swal.fire('Error!', 'Error in deleting question!', 'error');
  //         }
  //       });
  //     }
  //   });
  // }
  
}
