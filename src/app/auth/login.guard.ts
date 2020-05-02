import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate{

  constructor(private router:Router, private _authService:AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let canAccess = false;
      this._authService.userToken$.subscribe( user =>{
        if(!user){
          canAccess = true
        }else{
          this.router.navigate(['/home']);
        }
     })
     return canAccess;
  }

}
