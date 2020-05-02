import { Injectable, OnInit } from "@angular/core";
import * as firebase from "firebase";
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

  getToken(): void {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((token: string) => {
          this.userTokenSource.next(token);
        });
    }
  }

  logOut(): void {
    this.firebaseAuth.auth.signOut();
  }
  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe( user => {
      this.userTokenSource.next(user)
    })
  }

  ngOnInit() {}
}
