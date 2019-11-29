import {Component, Input, OnInit} from '@angular/core';
import imgConfig from '../../../assets/img/heights.js';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {

  private observer: IntersectionObserver;
  @Input() images: Array<any>;

  constructor() { }

  ngOnInit() {
    const options = {
      rootMargin: '-65px 0px 50px 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries, self) => {
      console.log('observing');
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('intersecting');
          this.preloadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, options);
  }

  private preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) { return; }
    img.src = src;
  }

}
