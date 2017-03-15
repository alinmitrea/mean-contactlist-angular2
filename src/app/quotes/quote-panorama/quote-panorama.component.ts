import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-panorama',
  templateUrl: './quote-panorama.component.html',
  styleUrls: ['./quote-panorama.component.css']
})
export class QuotePanoramaComponent implements OnInit {
  title: string = "七転び八起き “Fall down seven times, get up eight.”";
  textClass: string = "black_text";

  selectColor(color: string): void {
    this.textClass = color;
    var contents = "selectedColor" + color;
    console.log(contents);
  }

  constructor() { }

  ngOnInit() {
  }

}
