import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {AuthenticationService} from '../../services/authentication.service';
import * as fromUser from '../../../store/reducers/user.reducer';
import {Router} from '@angular/router';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-pin-header',
  templateUrl: './pin-header.component.html',
  styleUrls: ['./pin-header.component.scss']
})
export class PinHeaderComponent implements OnInit {
  user: any;

  constructor(
    private auth: AuthenticationService,
    private store: Store<fromUser.UserState>,
    private router: Router,
    private image: ImageService,
  ) {}

  ngOnInit() {
  }

  navigate(path) {
    this.router.navigate([path]);
  }

  signIn() {
    return this.auth.githubSignin();
  }

  signOut() {
    return this.auth.signOut();
  }

  getUserFirstName(name) {
    return name.split(' ')[0];
  }

}
