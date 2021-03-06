import { map, tap } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
  token:string | null=null
  constructor(private _authService:AuthService, private router:Router){}
  ngOnInit(){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let canAccess = false;
      this._authService.userToken$.subscribe( user =>{
        if(user){
          canAccess = true
        }else{
          this.router.navigate(['/login']);
        }
     })
     return canAccess;
  }

}
