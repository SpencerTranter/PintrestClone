import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AuthenticationService} from '../../services/authentication.service';
import { selectUser } from '../../store/selectors/user.selectors';
import * as fromUser from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-pin-header',
  templateUrl: './pin-header.component.html',
  styleUrls: ['./pin-header.component.scss']
})
export class PinHeaderComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthenticationService,
    private store: Store<fromUser.UserState>
  ) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
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

}
