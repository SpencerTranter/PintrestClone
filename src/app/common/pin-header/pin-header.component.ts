import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AuthenticationService} from '../../services/authentication.service';
import { selectUser } from '../../store/selectors/user.selectors';
import * as fromUser from '../../store/reducers/user.reducer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pin-header',
  templateUrl: './pin-header.component.html',
  styleUrls: ['./pin-header.component.scss']
})
export class PinHeaderComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthenticationService,
    private store: Store<fromUser.UserState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  navigate(path) {
    this.router.navigate([path]);
  }

  signIn() {
    return this.authService.authenticate();
  }

  signOut() {
    return this.authService.signOut();
  }

  isAuthenticated() {
    return this.user !== null;
  }

  getUserFirstName() {
    return this.user.name.split(' ')[0];
  }

}
