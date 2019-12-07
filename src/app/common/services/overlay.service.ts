import {ComponentRef, Injectable, InjectionToken, Injector} from '@angular/core';
import { CustomOverlayRef } from '../components/overlay/custom-overlay-ref';
import {ComponentType, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
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

  open(
    config: CustomOverlayConfig = {},
    token: InjectionToken<{}>,
    component: ComponentType<any>,
    backdropClose: boolean = true
  ) {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new CustomOverlayRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef, token, component);

    // Pass the instance of the overlay component to the remote control
    dialogRef.componentInstance = overlayComponent;

    if (backdropClose) {
      overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    }
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
    token: InjectionToken<{}>,
    component: ComponentType<any>
  ) {
    const injector = this.createInjector(config, dialogRef, token);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal); // switch for other components

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
