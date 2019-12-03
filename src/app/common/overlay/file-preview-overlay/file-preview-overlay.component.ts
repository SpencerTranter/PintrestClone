import {Component, Inject} from '@angular/core';
import {IMAGE_DATA} from './file-preview-overlay.tokens';
import {OverlayRef} from '@angular/cdk/overlay';
import {Store} from '@ngrx/store';
import * as fromUser from '../../../store/reducers/user.reducer';
import {AddUserImage} from '../../../store/actions/user.action';

@Component({
  selector: 'app-file-preview-overlay',
  templateUrl: './file-preview-overlay.component.html',
  styleUrls: ['./file-preview-overlay.component.scss']
})
export class FilePreviewOverlayComponent {

  constructor(
    @Inject(IMAGE_DATA) public image: any,
    private store: Store<fromUser.UserState>
  ) {}

  private saveImage() {
    this.store.dispatch(new AddUserImage(this.image));
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

}

export class FilePreviewOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
