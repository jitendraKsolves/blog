import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private loginService: LoginService,private router: Router) { }
    
  canActivate():  Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['../../login'])
      return false;
    }
  }
  
}
