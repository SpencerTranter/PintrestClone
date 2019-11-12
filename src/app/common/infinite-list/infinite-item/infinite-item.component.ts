import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import { OverlayService } from '../../../services/overlay.service';

@Component({
  selector: 'app-infinite-item',
  templateUrl: './infinite-item.component.html',
  styleUrls: ['./infinite-item.component.scss']
})
export class InfiniteItemComponent implements OnInit {
  @Input() src: string;
  @Input() observable: IntersectionObserver;
  @ViewChild('img', null) image;

  constructor(
    private overlayService: OverlayService
  ) { }

  ngOnInit() {
    this.observable.observe(this.image.nativeElement);
  }

  openOverlay() {
    this.overlayService.open();
  }

}
