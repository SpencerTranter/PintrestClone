import { Component, OnInit } from '@angular/core';
import imgConfig from '../../assets/img/heights';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageArray = Array.from({length: 200}).map((item, index) => {
    const num = Math.floor(Math.random() * 10) + 1;
    return {
      src: `../../../assets/img/img${num}.jpg`,
      height: this.calculateImgHeight(num),
      id: index
    };
  });

  constructor() { }

  ngOnInit() {
  }

  calculateImgHeight(num) {
    const height = imgConfig[num].height;
    const width = imgConfig[num].width;
    const ratio = 236 / width;
    return height * ratio;
  }

}
