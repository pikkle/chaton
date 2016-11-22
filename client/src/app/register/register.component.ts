import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    ApiService
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private http: Http, private apiService: ApiService) { }
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

  register(): Promise<any> {
    console.log("Calling register");
    console.log(this.email);
    console.log(this.username);
    console.log(this.password);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = "/api/profile";
    let data = {
      "email": this.email,
      "username": this.username,
      "password": this.password,
      "public_key": "01239019"
    }
    return this.apiService.post(headers, options, data, url).then(this.extractData)
  }
}
