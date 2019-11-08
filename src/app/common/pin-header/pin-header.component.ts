import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-pin-header',
  templateUrl: './pin-header.component.html',
  styleUrls: ['./pin-header.component.scss']
})
export class PinHeaderComponent implements OnInit {
  isAuthenticated;

  constructor(
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(isAuth => this.isAuthenticated = isAuth);
  }

  signIn() {
    return this.authService.authenticate();
  }

  signOut() {
    return this.authService.signOut();
  }

}
