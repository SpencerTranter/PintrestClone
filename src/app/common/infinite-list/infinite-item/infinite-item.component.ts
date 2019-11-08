import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-infinite-item',
  templateUrl: './infinite-item.component.html',
  styleUrls: ['./infinite-item.component.scss']
})
export class InfiniteItemComponent implements OnInit {
  @Input() src: string;
  @Input() observable: IntersectionObserver;
  @ViewChild('img', null) image;

  constructor() { }

  ngOnInit() {
    console.log(this.image);
    this.observable.observe(this.image.nativeElement);
  }

}
