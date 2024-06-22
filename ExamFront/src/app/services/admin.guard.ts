import { CanActivateFn,Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  const login=inject(LoginService);
  if(login.isLoggedIn() && login.getUserRoles()=='Admin')
  {
    return true;
  }
  else{

    router.navigate(['login']);
    return false;
  }
  
};
