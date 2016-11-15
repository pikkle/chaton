import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }
  private email: string;
  private password: string;
  private username: string;
  private repeatPassword: string;
  ngOnInit() {
    [].map.call(document.querySelectorAll('.profile'), function (el) {
      el.classList.toggle('profile--open');
    });
  }
  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    return body.data || {};
  }
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
  register(): Promise<any> {
    console.log("Calling register");
    console.log(this.email);
    console.log(this.username);
    console.log(this.password);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://localhost:80/api/profile", {
      "email": this.email,
      "username": this.username,
      "password": this.password,
      "public_key": "01239019"
    }, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
