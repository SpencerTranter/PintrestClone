import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isAuthenticatedSource = new BehaviorSubject(false);
  isAuthenticated = this.isAuthenticatedSource.asObservable();
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   })
  // };

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => this.isAuthenticatedSource.next(!!params['code']));
  }

  public authenticate() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=62d8e36013e28241eb89';
    // this.router.navigate(['/externalRedirect', {externalUrl: 'https://github.com/login/oauth/authorize?clientId=62d8e36013e28241eb89'}]);
  }

  public signOut() {
    return this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { code: '' },
        queryParamsHandling: 'merge',
      });
  }

}
