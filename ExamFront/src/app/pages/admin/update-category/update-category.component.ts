import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  category: any = {
    title: '',
    description: '',
    cid: 0, // Initialize with the Category ID you want to update
  };

  constructor(private _cat:CategoryService,
    private _route:ActivatedRoute,
    private _router:Router,
    ){}

  ngOnInit():void{
    this.category.cid =this._route.snapshot.params['cid'];
    console.log(this.category.cid);

    this._cat.getCategoryById(this.category.cid).subscribe({
      next:(data:any)=>{
        this.category=data;
      },
      error:(error:any)=>{
        console.log(error);
      }
    })

  }

  updateCategory()
  {
    this._cat.updateCategory(this.category).subscribe({
      next:(data:any)=>{
        this.category=data;
        Swal.fire('Success','Category Successfully updated!','success')
        this._router.navigate(['admin/categories']);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Something went Wrong!','error')
      }
    })
  }
}
