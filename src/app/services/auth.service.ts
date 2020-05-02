import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: "root",
})
export class AuthService implements OnInit {
  userTokenSource = new BehaviorSubject<any | null>(null);
  userToken$ = this.userTokenSource.asObservable();


  singUp(email: string, password: string) {
     return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)

  }

  logIn(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(): void {
    this.firebaseAuth.auth.signOut();
  }
  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe( user => {
      this.userTokenSource.next(user)
    })
  }

  ngOnInit() {}
}
