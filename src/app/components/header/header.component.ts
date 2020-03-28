import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'

})
export class HeaderComponent {

  logOut(){
    this._authSevice.logOut();
  }
  constructor(public _authSevice:AuthService){}
}
