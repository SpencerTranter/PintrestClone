import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { OverlayService } from '../../../services/overlay.service';
import { IMAGE_DATA } from '../../overlay/file-preview-overlay/file-preview-overlay.tokens';

@Component({
  selector: 'app-infinite-item',
  templateUrl: './infinite-item.component.html',
  styleUrls: ['./infinite-item.component.scss']
})
export class InfiniteItemComponent implements OnInit {
  @Input() imgConfig: any;
  @Input() observable: IntersectionObserver;
  @ViewChild('img', null) image;
  baseWidth: number;
  baseHeight: number;

  constructor(
    private overlayService: OverlayService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.observable.observe(this.image.nativeElement);
    this.image.nativeElement.onload = () => {
      if (!this.baseWidth && !this.baseHeight) {
        this.baseWidth = this.image.nativeElement.naturalWidth;
        this.baseHeight = this.image.nativeElement.naturalHeight;
      }
    };
  }

  private openOverlay(event: any) {
    const overlayConfig = this.createOverlayConfig();
    this.overlayService.open(overlayConfig, IMAGE_DATA);
    this.renderer.removeClass(event.target, 'menu');
  }

  private over(event: any) {
    this.renderer.addClass(event.target, 'menu');
  }

  private out(event: any) {
    this.renderer.removeClass(event.target, 'menu');
  }

  private createOverlayConfig() {
    return {
      data: this.imgConfig,
      ...this.getImageSize(this.baseHeight, this.baseWidth)
    };
  }

  private getImageSize(height, width) {
    // What if width > 500?
    if (height > 600) {
      const ratio = 600 / height;
      return { width: width * ratio, height: 600 };
    }
    return { width, height };
  }

}
