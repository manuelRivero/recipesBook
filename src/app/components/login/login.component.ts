import { AuthService } from "./../../services/auth.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  successAlert = false;
  isLoading = false;
  errorAlert = null;
  signUp = false;

  setOkStatus() {
    this.isLoading = false;
    this.successAlert = true;
    this.errorAlert = null;
    console.log("set status ok ")
    setTimeout(()=>{this.router.navigate(['/recipes'])},1000)


  }
  setErrorStatus(err) {
    this.isLoading = false;
    this.successAlert = false;
    this.errorAlert = err.message;
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;
    this.successAlert = false;
    this.errorAlert = null;
    if (this.signUp) {
      this._authService
        .singUp(email, password)
        .then(res => {
          this.setOkStatus();
        })
        .catch(err => {
          this.setErrorStatus(err);
        });
    } else {
      this._authService
        .logIn(email, password)
        .then(res => {
          this.setOkStatus();
        })
        .catch(err => {
          this.setErrorStatus(err);
        });
    }
  }

  modetoogle() {
    this.signUp = !this.signUp;
  }
  constructor(private _authService: AuthService, private router:Router) {}

  ngOnInit() {}
}
