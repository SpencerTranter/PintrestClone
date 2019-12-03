import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GetToken, GetUserSuccess} from '../store/actions/user.action';
import {Store} from '@ngrx/store';
import * as fromUser from '../store/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromUser.UserState>
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!!params['code']) {
        this.store.dispatch(new GetToken(params['code']));
        this.removeCode();
      }
    });
  }

  public authenticate() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=62d8e36013e28241eb89';
  }

  getAccessToken(code) {
    console.log('code', code);
    return this.http.post(
      '/git/login/oauth/access_token',
      {
        client_id: '62d8e36013e28241eb89',
        client_secret: '3ec53fcceaaeb6c3be162faf72c5c0da20a7d327',
        code: code
      },
      {
        responseType: 'text',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/javascript, */*',
        },
      }
    );
  }

  getUserInformation(token) {
    console.log('token', token);
    return this.http.get(
      '/api/user',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/javascript, */*',
          Authorization: `token ${token}`
        },
    });
  }

  validateToken(res: string) {
    const RGX = new RegExp('access_token=([a-z 0-9]*)&scope');
    const tokenMatch = res.match(RGX);
    if (!tokenMatch) {
      return false;
    }
    return tokenMatch[1];
  }

  removeCode() {
    return this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { code: '' },
        queryParamsHandling: 'merge',
    });
  }

  public signOut() {
    this.store.dispatch(new GetUserSuccess(null));
  }
}
