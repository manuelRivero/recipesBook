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
  ngOnInit(){
    this._authService.userToken$.subscribe( token =>{
      this.token = token;

    })
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this._authService.userToken$.pipe(
        map( token =>{
        return !!token ;
        }),
        tap( token => !token && this.router.navigate(['/login']))
      )
  }

}
