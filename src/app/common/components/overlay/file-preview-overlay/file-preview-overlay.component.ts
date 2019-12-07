import {Component, EventEmitter, HostListener, Inject} from '@angular/core';
import {IMAGE_DATA} from './file-preview-overlay.tokens';
import { CustomOverlayRef } from '../custom-overlay-ref';
import {Store} from '@ngrx/store';
import * as fromUser from '../../../../store/reducers/user.reducer';
import {AddUserImage, DeleteUserImage} from '../../../../store/actions/user.action';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {getUserImages} from '../../../../store/selectors/user.selectors';
import {AuthenticationService} from '../../../services/authentication.service';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-file-preview-overlay',
  templateUrl: './file-preview-overlay.component.html',
  styleUrls: ['./file-preview-overlay.component.scss'],
  animations: [
    trigger('fade', [
      state('fadeOut', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('* => fadeIn', animate(ANIMATION_TIMINGS))
    ]),
    trigger('slideContent', [
      state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
      state('enter', style({ transform: 'none', opacity: 1 })),
      state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class FilePreviewOverlayComponent {
  loading = true;
  userImages = [];
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.dialogRef.close();
    }
  }

  constructor(
    @Inject(IMAGE_DATA) public image: any,
    private store: Store<fromUser.UserState>,
    public dialogRef: CustomOverlayRef,
    private auth: AuthenticationService
  ) {
    this.store.select(getUserImages).subscribe((images) => {
      this.userImages = images;
    });
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }

  private saveUserImage() {
    this.store.dispatch(new AddUserImage(this.image));
  }

  private removeUserImage() {
    this.store.dispatch(new DeleteUserImage(this.image));
  }

  private login() {
    this.auth.githubSignin();
  }

  private copyImage() {
    const listener = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.image.src));
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  canSave() {
    return !this.userImages.find(img => img.id === this.image.id);
  }

  onLoad(event: Event) {
    this.loading = false;
  }

}
