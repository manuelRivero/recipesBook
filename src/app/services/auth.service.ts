import { Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService  implements OnInit{
  userTokenSource = new BehaviorSubject<string | null>(null)
  userToken$ = this.userTokenSource.asObservable()
  singUp(email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
         console.log(res)
      });
  }

  logIn(email: string, password: string) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        return firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.userTokenSource.next(token)
          });
      });
  }

  getToken():void{
    if(firebase.auth().currentUser){
      firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => {
        this.userTokenSource.next(token);
      });
    }

  }

  logOut():void{
    firebase.auth().signOut().then(res => {
      this.userTokenSource.next(null)
      this.router.navigate(["login"])
    } )
  }
  constructor(private router:Router) { }

  ngOnInit(){
    this.getToken()
  }
}
