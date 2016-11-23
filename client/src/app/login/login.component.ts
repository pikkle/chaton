import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ApiService } from '../services/api.service'
import { SocketService } from '../services/socket.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    ApiService
  ]
})
export class LoginComponent implements OnInit {

  // Input by user through form
  private email: string;
  private password: string;

  // Constructor. Initializes LoginComponent's Router and Http fields
  constructor(private router: Router, private http: Http, private apiService: ApiService, private socketService: SocketService) {  }

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
  private extractData(res: Response): string {
    let body = res.json();
    return body;
  }

  

  /**
   * Called when user presses the login button
   */
  login(): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = '/api/auth';
    let data = {
      "email": this.email,
      "password": this.password
    }
    this.apiService.post(headers, options, data, url)
      .then(this.extractData)
      .then(data => {
        localStorage["token"] = data.token;
        localStorage["id"] = data.id;
        localStorage["email"] = this.email;
        this.socketService.authenticate(data.token, data.id, this.email);

        this.router.navigateByUrl('authenticated');
      })
  }
  redirectToRegister(): void {
    this.router.navigateByUrl('register');
  }
}
