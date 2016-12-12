import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {ApiService} from '../services/api.service';
import {SocketService} from '../services/socket.service';

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
  constructor(private router: Router,
              private apiService: ApiService,
              private socketService: SocketService) {
  }

  authenticated: boolean;

  ngOnInit() {
    // If user is already authenticated
    if (this.socketService.isAuthenticated()) {
      this.router.navigateByUrl('chat');
      return;
    }

    // Startup screen with only avatar
    document.getElementById('toggleProfile').addEventListener('click', function () {
      [].map.call(document.querySelectorAll('.profile'), function (el) {
        el.classList.toggle('profile--open');
      });
    });

  }

  /**
   * Called when user presses the login button
   */
  login(): void {
    this.apiService.login(this.email, this.password)
      .then(data => { // authenticate to server to open websocket
        localStorage["token"] = data.token;
        localStorage["id"] = data.id;
        localStorage["email"] = this.email;
        this.socketService.authenticate(data.token, data.id, this.email)
      })
      .then(_ => this.router.navigateByUrl('chat'));
  }

  redirectToRegister(): void {
    this.router.navigateByUrl('register');
  }

}
