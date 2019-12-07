import {Injectable} from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { UserTypes, GetToken } from '../actions/user.action';
import {AuthenticationService} from '../../common/services/authentication.service';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import {SPINNER_DATA} from '../../common/components/overlay/spinner-overlay/spinner-overlay.tokens';
import {OverlayService} from '../../common/services/overlay.service';
import {SpinnerOverlayComponent} from '../../common/components/overlay/spinner-overlay/spinner-overlay.component';
import {CustomOverlayRef} from '../../common/components/overlay/custom-overlay-ref';

@Injectable()
export class UserEffects {
  overlayRef: CustomOverlayRef;

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
    private overlayService: OverlayService
  ) {}

  @Effect({dispatch: false}) showSpinnerEffect = this.actions.pipe(
    ofType<GetToken>(UserTypes.GET_TOKEN),
    tap(() => {
      this.overlayRef = this.overlayService.open({}, SPINNER_DATA, SpinnerOverlayComponent, false);
    })
  );

  @Effect({dispatch: false}) disableSpinnerEffect = this.actions.pipe(
    ofType<GetToken>(UserTypes.GET_USER_SUCCESS),
    tap(() => {
      this.overlayRef.close();
      this.router.navigate(['/profile']);
    })
  );

}
