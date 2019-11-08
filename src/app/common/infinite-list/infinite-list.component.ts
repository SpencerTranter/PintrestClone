import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {

  private observer: IntersectionObserver;
  imageArray = Array.from({length: 100}).map(x => `../../../assets/img/img${Math.floor(Math.random() * 3) + 1}.jpg`);

  constructor(private host: ElementRef) { }

  ngOnInit() {
    const options = {
      // root: this.isHostScrollable(this.host.nativeElement) ? this.host.nativeElement : null,
      rootMargin: '0px 0px -50px 0px',
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

  private isHostScrollable(el) {
    const style = window.getComputedStyle(el);
    console.log(style.getPropertyValue('overflow'));
    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  private preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) { return; }
    img.src = src;
  }

}
