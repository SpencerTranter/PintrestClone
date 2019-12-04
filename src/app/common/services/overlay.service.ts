import {ComponentRef, Injectable, InjectionToken, Injector} from '@angular/core';
import { FilePreviewOverlayComponent } from '../components/overlay/file-preview-overlay/file-preview-overlay.component';
import { CustomOverlayRef } from '../components/overlay/custom-overlay-ref';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';

interface CustomOverlayConfig {
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
  width?: string | number;
  height?: string | number;
  data?: any;
}

const DEFAULT_CONFIG: OverlayConfig = {
  hasBackdrop: true,
  panelClass: 'tm-preview-panel',
};

@Injectable({ providedIn: 'root' })
export class OverlayService {

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  open(config: CustomOverlayConfig = {}, token: InjectionToken<{}>) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new CustomOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef, token);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    return dialogRef;
  }

  private createOverlay(config: CustomOverlayConfig) {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      width: config.width,
      height: config.height,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(
    overlayRef: OverlayRef,
    config: CustomOverlayConfig,
    dialogRef: CustomOverlayRef,
    token: InjectionToken<{}>
  ) {
    const injector = this.createInjector(config, dialogRef, token);

    const containerPortal = new ComponentPortal(FilePreviewOverlayComponent, null, injector);
    const containerRef: ComponentRef<FilePreviewOverlayComponent> = overlayRef.attach(containerPortal); // switch for other components

    return containerRef.instance;
  }

  private createInjector(config, dialogRef, token): PortalInjector {
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(CustomOverlayRef, dialogRef);
    injectionTokens.set(token, config.data);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

}
