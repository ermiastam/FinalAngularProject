import {EventEmitter, Injectable} from "@angular/core";
import * as auth0 from "auth0-js";
import {Router} from "@angular/router";




@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID:'6XaSK7EIxsRYjOTTQp1GOLtxzmxCfduo',
    domain:'swifthireapp.auth0.com',
    redirect:false,
    responseType: 'token id_token',
    /*audience: 'https://manojchaudhary.auth0.com/userinfo',*/
    redirectUri: 'http://localhost:4200/homepage',
    scope: 'openid profile'
  });



  loggedIn:EventEmitter<string>;

  constructor(private router: Router) {
    this.loggedIn=new EventEmitter();
  }

  login(): void {
    this.auth0.authorize();
  }

 /* public loggedIn(){
    return tokenNotExpired;

  }*/

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        console.log("before navigate"+ localStorage.getItem("profile"));
        this.router.navigate(['homepage']);
      } else if (err) {
        this.router.navigate(['home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile',JSON.stringify(authResult.idTokenPayload));
    this.loggedIn.emit((authResult.idTokenPayload));

  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['']);
  }
  getUser(){
    return JSON.parse(localStorage.getItem('profile'));

  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
