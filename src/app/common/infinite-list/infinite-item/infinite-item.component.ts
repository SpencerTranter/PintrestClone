import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { OverlayService } from '../../../services/overlay.service';

@Component({
  selector: 'app-infinite-item',
  templateUrl: './infinite-item.component.html',
  styleUrls: ['./infinite-item.component.scss']
})
export class InfiniteItemComponent implements OnInit {
  @Input() imgConfig: any;
  @Input() observable: IntersectionObserver;
  @ViewChild('img', null) image;

  constructor(
    private overlayService: OverlayService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.observable.observe(this.image.nativeElement);
    this.image.nativeElement.onload = () => {
      this.imgConfig.baseSize = {
        height: this.image.nativeElement.naturalHeight,
        width: this.image.nativeElement.naturalWidth
      };
    };
  }

  openOverlay(event: any) {
    this.overlayService.open(this.imgConfig);
    this.renderer.removeClass(event.target, 'menu');
  }

  over(event: any) {
    this.renderer.addClass(event.target, 'menu');
  }

  out(event: any) {
    this.renderer.removeClass(event.target, 'menu');
  }

}
