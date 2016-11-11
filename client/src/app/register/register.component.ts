import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }
  private email: string;
  private username: string;
  private password: string;
  private repeatPassword: string;
  ngOnInit() {
    [].map.call(document.querySelectorAll('.profile'), function (el) {
      el.classList.toggle('profile--open');
    });
  }
  register(): void {
    console.log("Calling register");
    console.log(this.email);
    console.log(this.username);
    console.log(this.password);
    var body = {
      email: this.email,
      username: this.username,
      password: this.password
    };
    this.email = this.username = this.password = this.repeatPassword = "";
    // http.post('http://localhost:9090', 
  }
}
