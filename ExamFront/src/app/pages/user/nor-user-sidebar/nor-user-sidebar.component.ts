import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nor-user-sidebar',
  templateUrl: './nor-user-sidebar.component.html',
  styleUrls: ['./nor-user-sidebar.component.css']
})
export class NorUserSidebarComponent {

  categories: Array<{ title: string, description: string, cid:number }> = [];
  constructor( 
    private _cat:CategoryService
  ){}

  ngOnInit(): void {
    this._cat.categories().subscribe({
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
}
