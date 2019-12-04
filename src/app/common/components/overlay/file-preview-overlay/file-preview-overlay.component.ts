import {Component, HostListener, Inject} from '@angular/core';
import {IMAGE_DATA} from './file-preview-overlay.tokens';
import { CustomOverlayRef } from '../custom-overlay-ref';
import {Store} from '@ngrx/store';
import * as fromUser from '../../../../store/reducers/user.reducer';
import {AddUserImage} from '../../../../store/actions/user.action';

@Component({
  selector: 'app-file-preview-overlay',
  templateUrl: './file-preview-overlay.component.html',
  styleUrls: ['./file-preview-overlay.component.scss']
})
export class FilePreviewOverlayComponent {
  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.dialogRef.close();
    }
  }

  constructor(
    @Inject(IMAGE_DATA) public image: any,
    private store: Store<fromUser.UserState>,
    public dialogRef: CustomOverlayRef,
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
