import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
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

  login(): void {
    //if (this.authenticated) {
    this.router.navigateByUrl('authenticated');
    //}
  }
  redirectToRegister(): void {
    this.router.navigateByUrl('register');
  }
}
