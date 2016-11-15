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

  private email: string;
  private password: string;
  constructor(private router: Router, private http: Http) { }
  authentified: boolean;
  ngOnInit() {
    this.authentified = false;
    if (this.authentified) {
      this.router.navigateByUrl('authenticated');
    }
    document.getElementById('toggleProfile').addEventListener('click', function () {
      [].map.call(document.querySelectorAll('.profile'), function (el) {
        el.classList.toggle('profile--open');
      });
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
  login(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://localhost:80/api/auth", JSON.stringify({
      "email": this.email,
      "password": this.password,
    }), options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError).then(data => {
        console.log(data);
        var token = data;
        // this.router.navigateByUrl('authenticated');
      })
  }
  redirectToRegister(): void {
    this.router.navigateByUrl('register');
  }
}
