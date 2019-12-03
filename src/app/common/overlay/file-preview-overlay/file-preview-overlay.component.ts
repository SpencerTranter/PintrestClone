import {Component, Inject, OnInit} from '@angular/core';
import {IMAGE_DATA} from './file-preview-overlay.tokens';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-file-preview-overlay',
  templateUrl: './file-preview-overlay.component.html',
  styleUrls: ['./file-preview-overlay.component.scss']
})
export class FilePreviewOverlayComponent implements OnInit {

  constructor(
    @Inject(IMAGE_DATA) public image: any
  ) { }

  ngOnInit() {
  }

}

export class FilePreviewOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
