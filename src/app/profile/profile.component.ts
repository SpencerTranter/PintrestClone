import { Component, OnInit } from '@angular/core';
import {getUserImages} from '../store/selectors/user.selectors';
import {Store} from '@ngrx/store';
import * as fromUser from '../store/reducers/user.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  images = [];
  constructor(
    private store: Store<fromUser.UserState>,
  ) { }

  ngOnInit() {
    this.store.select(getUserImages).subscribe((images) => {
      this.images = images;
    });
  }

}
