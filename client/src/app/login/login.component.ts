import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Input by user through form
  private email: string;
  private password: string;

  // Constructor. Initializes LoginComponent's Router and Http fields
  constructor(private router: Router, private http: Http) { }

  authenticated: boolean;
  ngOnInit() {
    this.authenticated = false;//(localStorage["token"] !== undefined); // tmp

    // If user is already authenticated
    if (this.authenticated) {
      this.router.navigateByUrl('authenticated');
    }

    // Startup screen with only avatar
    document.getElementById('toggleProfile').addEventListener('click', function () {
      [].map.call(document.querySelectorAll('.profile'), function (el) {
        el.classList.toggle('profile--open');
      });
    });

  }

  /**
  * Extracts JWT from server response
  * @param {Response} res: Response sent by server 
  * @return {string} token
  */
  private extractToken(res: Response): string {
    console.log(res);
    let body = res.json();
    return body.token;
  }

  /**
   * Handles error responses
   * @param { Reponse | any } error: Error response sent by server
   * @return { Promise } Promisified error message
   */
  private handleError(error: Response | any) {
    console.log(error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  /**
   * Called when user presses the login button
   * 
   * 
   */
  login(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://localhost:80/api/auth", JSON.stringify({
      "email": this.email,
      "password": this.password,
    }), options)
      .toPromise()
      .then(this.extractToken)
      .catch(this.handleError)
      .then(token => {
        console.log(token);
        localStorage["token"] = token;
        this.router.navigateByUrl('authenticated');
      })
  }
  redirectToRegister(): void {
    this.router.navigateByUrl('register');
  }
}
