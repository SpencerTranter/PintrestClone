import { Injectable } from '@angular/core';
import { OverlayComponent } from '../common/overlay/overlay.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  overlayRef;

  constructor(private overlay: Overlay) { }

  public open() {
    this.overlayRef = this.overlay.create({
      width: '100%',
      height: '100%',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    const previewPortal = new ComponentPortal(OverlayComponent);
    this.overlayRef.attach(previewPortal);
  }

  public close() {
    if (!!this.overlayRef) {
      this.overlayRef.close();
      this.overlayRef = null;
    }
  }
}
