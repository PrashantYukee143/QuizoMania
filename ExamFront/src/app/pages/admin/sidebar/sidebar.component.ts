import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
constructor(private loginService:LoginService,private router:Router){}

logout() {
  // Show a confirmation dialog using SweetAlert2
  Swal.fire({
    title: 'Are you sure you want to log out?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'No, cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, proceed with logout
      this.loginService.logout();
      this.loginService.loginStatusSubject.next(false);
      // Optionally, navigate to the login page or any other desired route
      this.router.navigate(['login']); // Navigate to the login page or any other route
    } else {
      // User canceled, do nothing
    }
  });
}





}
