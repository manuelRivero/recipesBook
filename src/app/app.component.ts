import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "recipesProject";

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyB_lE_6zrg_zJOB_PM9rU2-AXFUo19yE2k",
      authDomain: "recipes-b2a18.firebaseapp.com",
      databaseURL: "https://recipes-b2a18.firebaseio.com"
    });
  }
}
