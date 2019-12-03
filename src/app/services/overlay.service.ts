import {Injectable, InjectionToken, Injector} from '@angular/core';
import { FilePreviewOverlayComponent, FilePreviewOverlayRef } from '../common/overlay/file-preview-overlay/file-preview-overlay.component';
import { Overlay } from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {IMAGE_DATA} from '../common/overlay/file-preview-overlay/file-preview-overlay.tokens';
// import {FilePreviewOverlayRef} from '../common/overlay/file-preview-overlay/file-preview-overlay-ref'

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  public open(imageConfig) {
    const {width, height} = this.getImageSize(imageConfig.baseSize);
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      width: `${width}px`,
      height: `${height + 50}px`,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    // Create injector to pass data to overlay component
    const injector = this.createInjector(imageConfig);
    const previewPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
    overlayRef.attach(previewPortal);

    const dialogRef = new FilePreviewOverlayRef(overlayRef);
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    // Allows use of close() by API calling this
    return dialogRef;
  }

  private createInjector(imageConfig): PortalInjector {
    const injectionTokens = new WeakMap();
    // Set custom injection tokens
    injectionTokens.set(IMAGE_DATA, imageConfig);
    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  private getImageSize(baseSize) {
    // What if width > 500?
    if (baseSize.height > 600) {
      const ratio = 600 / baseSize.height;
      const width = baseSize.width * ratio;
      return { width, height: 600 };
    }
    return baseSize;
  }
}
