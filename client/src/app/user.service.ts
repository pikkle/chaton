import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private username: string;
  private email: string;
  constructor(param_username: string, param_email: string) {
    this.username = param_username;
    this.email = param_email;
    this.email = "test@test.test";
  }
  getUsername(): string {
    return this.username;
  }
  getEmail(): string {
    return this.email;
  }
}
