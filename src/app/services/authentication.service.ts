import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = false;

  constructor() { }

  public getAuthentication() {
    return this.isAuthenticated;
  }

  public authenticate() {
    if (!this.isAuthenticated) {
      // github logic
      this.isAuthenticated = true;
    }
  }

  public signOut() {
    // clear session
    this.isAuthenticated = false;
  }

}
