import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { catchError ,tap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData=
  {
    username:'',
    password:''
  }


  constructor(private Snack:MatSnackBar , private login:LoginService, private router:Router) {}

  formSubmit()
  {
    console.log('clicked !!!')

    if(this.loginData.username.trim()==''|| this.loginData.username==null)
    {
      this.Snack.open('Username is Required','',
      {
        duration:3000
      });
    }

    if(this.loginData.password.trim()==''|| this.loginData.password==null)
    {
      this.Snack.open('password is Required','',
      {
        duration:3000
      });
      return;
    }

    this.login.generateToken(this.loginData)
  .pipe(
    tap((data: any) => {
      console.log('success');
      console.log(data);

      //login
      this.login.loginUser(data.token);

      this.login.getCurrentUser().subscribe(
        (user:any)=>{
          this.login.setUser(user);
          console.log(user);

          //Redirect... ADMIN: Admin dashboard
          //Redirect... NORMAL: Normal Dashboard

          if(this.login.getUserRoles()=='Admin')
          {
            // window.location.href='/admin';
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true)
          }
          else if(this.login.getUserRoles()=='Normal')
          {
            // window.location.href='/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true)
          }
          else{
            this.login.logout();
          }
          
        }
      );

    }),
    catchError((error) => {
      console.log('error');
      console.log(error);
      this.Snack.open('Invalid Details','',{
        duration:3000,
      })
      throw error; // Re-throw the error to propagate it further if needed
    })
  )
  .subscribe();
  }

  hide = true;
}
