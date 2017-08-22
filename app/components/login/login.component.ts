import { Page } from 'ui/page';
import { Component, OnInit } from '@angular/core';
import { SnackBar } from "nativescript-snackbar";
import { RouterExtensions } from 'nativescript-angular/router';

import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user';


import {LoadingIndicator} from "nativescript-loading-indicator";

//import { SnackBar } from 'nativescript-snackbar';
//import * as ApplicationSettings from 'application-settings';

@Component({
  moduleId: module.id,
  selector: 'kl-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login-common.css','login.css']
})
export class LoginComponent implements OnInit {
  public input:any;
  public isLoggingIn:Boolean = true;
  public error = false;

  constructor(private page:Page, private userService:UserService, private routerExtensions:RouterExtensions) {
    this.input = {
      email: '',
      password: ''
    }
  }

  public ngOnInit() {
    this.page.backgroundImage = "res://bg_login";
    this.input.email = this.user.email;
    this.input.password = this.user.password;
    /*
     if (ApplicationSettings.getBoolean('authenticated', false)) {
     this.routerExtensions.navigate(['secure'], { clearHistory: true });
     }
     */
  }

  private isEmailAddress(email:string) {
    const pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
  }


  private checkFields() {
    if (this.input.email && this.input.password) {
      if (!this.isEmailAddress(this.input.email)) 'Incorrect Email!';
    } else {
      return 'All fields required';
    }
  }

  private register() {
    this.userService.register(this.input.email, this.input.password);
    console.log(JSON.stringify(this.user.toJSON()));
  }

  private login() {
    const msg = this.checkFields();
    if (!msg) {
      if (!this.userService.login(this.input.email, this.input.password)) return (new SnackBar()).simple("Incorrect Credentials!");
    } else return (new SnackBar()).simple(msg);
    this.routerExtensions.navigate(['places'], { clearHistory: true });
  }

  public loginFb() {
    this.userService.loginFb()
      .subscribe(
        (authentificated) => {
          console.log('authentificated 1', authentificated);
          console.log('test');
          if (authentificated) {
            console.log('go to places');
            this.routerExtensions.navigate(['places'], { clearHistory: true });
          } else console.log('no go to places');
        },
        error => console.log('error', error),
        () => console.log('completed')
      )
  }

  public submit() {
    if (this.isLoggingIn) this.login();
    else this.register();
  }
  public get user():User {
    return this.userService.user;
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}