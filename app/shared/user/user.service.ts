import { Injectable } from "@angular/core";
import * as tnsOAuthModule from 'nativescript-oauth';
import * as ApplicationSettings from "application-settings";
import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { User } from "./user";

@Injectable()
export class UserService {
  public user:User = new User();

  public constructor(private http:Http) {
    if (ApplicationSettings.hasKey('authentification')) {
      const auth = JSON.parse(ApplicationSettings.getString('authentification'));
      this.user.email = auth.email ? auth.email : '';
      this.user.password = auth.password ? auth.password : '';
      this.user.origin = auth.origin;
    }
    console.log(JSON.stringify(this.user.toJSON()));
  }

  private _retrieveFbEmail() {
    const url:string = "https://graph.facebook.com/v2.10/me?fields=email&access_token=" + tnsOAuthModule.accessToken();
    return this.http.get(url)
      .map((result:Response) => {
        return JSON.parse(result.text());
      });
  }

  public register(email:string, password:string) {
    if (this.login(email,password)) return false;
    this.user.email = email;
    this.user.password = password;
    this.user.origin = 'native';
    ApplicationSettings.setString('authentification', JSON.stringify(this.user.toJSON()));

  }

  public login(email:string, password:string) {
    if(email === this.user.email && password === this.user.password && this.user.origin === 'native') return true;
    else return false;
  }

  public loginFb() {
    return Observable.create(observer => {
      tnsOAuthModule.ensureValidToken()
        .then((token: string) => {
          this._retrieveFbEmail()
            .subscribe(
              (result) => {
                this.user.email = result.email;
                this.user.origin = 'facebook';
                ApplicationSettings.setString('authentification', JSON.stringify(this.user.toJSON()));
                observer.next(true);
                observer.complete();
              },
              error => {
                observer.error(error)
              }
            );
        })
        .catch((err)=>{
          observer.error(err);
        });
    });

  }
}