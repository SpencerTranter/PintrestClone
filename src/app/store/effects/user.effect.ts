import {Injectable} from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import {GetTokenSuccess, UserTypes, GetToken, GetTokenError, GetUser, GetUserSuccess} from '../actions/user.action';
import {AuthenticationService} from '../../services/authentication.service';
import {map, switchMap, catchError, concatMap} from 'rxjs/operators';

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService
  ) {}

  @Effect() getTokenEffect = this.actions.pipe(
    ofType<GetToken>(UserTypes.GET_TOKEN),
    switchMap(({payload}) => {
      return this.authService.getAccessToken(payload).pipe(
        concatMap((res) => this.authService.validateToken(res) ?
            [
              new GetTokenSuccess(this.authService.validateToken(res)),
              new GetUser(this.authService.validateToken(res))
            ] :
            [new GetTokenError()]
        ),
      );
    })
  );

  @Effect() getUserEffect = this.actions.pipe(
    ofType<GetUser>(UserTypes.GET_USER),
    switchMap(({payload}) => {
      return this.authService.getUserInformation(payload).pipe(
        concatMap((res) => {
          return [
          new GetUserSuccess(res),
        ];
        })
      );
    })
  );
}
