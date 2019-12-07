import {OverlayRef} from '@angular/cdk/overlay';
import {filter, take} from 'rxjs/operators';

export class CustomOverlayRef {
  componentInstance;

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    // Listen for animation 'start' events
    this.componentInstance.animationStateChanged.pipe(
      // @ts-ignore
      filter(event => event.phaseName === 'start'),
      take(1)
    ).subscribe(() => {
      this.overlayRef.detachBackdrop();
    });

    // Listen for animation 'done' events
    this.componentInstance.animationStateChanged.pipe(
      // @ts-ignore
      filter(event => event.phaseName === 'done' && event.toState === 'leave'),
      take(1)
    ).subscribe(() => {
      this.overlayRef.dispose();
      // Make sure to also clear the reference to the
      // component instance to avoid memory leaks
      this.componentInstance = null;
    });

    // Start exit animation
    this.componentInstance.startExitAnimation();
  }
}
