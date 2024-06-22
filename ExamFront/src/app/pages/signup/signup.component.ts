import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide = true;

  user: any = {}; // Initialize the user object or use a defined model class

  constructor(private userService: UserServiceService,private Snack:MatSnackBar) {}

  onSubmit() {
    if (this.isFormValid()) {
      // Check if the user already exists within the createUser method
      this.userService
        .addUser(this.user)
        .pipe(
          catchError((error) => {
            if (error.status === 401) {
              // User already exists, show a popup message
              Swal.fire('User Exists', 'The user already exists.', 'error');
            } else {
              console.error(error);
              this.Snack.open('Something went wrong!!', '', {
                duration: 3000,
              });
            }
            return of(null);
          })
        )
        .subscribe((data: any) => {
          if (data !== null) {
            console.log(data);
            Swal.fire(
              'Success',
              'Successfully Registered with id:' + data.id,
              'success'
            );
            this.resetForm();
          }
        });
    } else {
      this.Snack.open('Please fill in all required fields', '', {
        duration: 3000,
      });
    }
  }

  // ... other code ...

  isFormValid() {
    // Check if any required fields are empty
  //   console.log("Checking form validity...");

  // console.log("Username:", this.user.username);
  // console.log("Password:", this.user.password);
  // console.log("First Name:", this.user.firstName);
  // console.log("Last Name:", this.user.lastname);
  // console.log("Email:", this.user.email);
  // console.log("Phone:", this.user.phone);

    if (
      !this.user.username || 
    this.user.username.trim() === '' ||
    !this.user.password || 
    this.user.password.trim() === '' ||
    !this.user.firstName || 
    this.user.firstName.trim() === '' ||
    !this.user.lastname || 
    this.user.lastname.trim() === '' ||
    !this.user.email || 
    this.user.email.trim() === '' ||
    !this.user.phone || 
    this.user.phone.toString().trim() === ''
    ) {
      console.log("One or more fields are empty");
      return false; // Form is not valid if any required field is empty
    }
    console.log("All fields are filled");
    return true; // Form is valid if all required fields have values
  }

  resetForm() {
    // Reset the user object to clear the form fields
    this.user = {};
  }
}
