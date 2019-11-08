import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-pin-header',
  templateUrl: './pin-header.component.html',
  styleUrls: ['./pin-header.component.scss']
})
export class PinHeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthentication();
  }

}
