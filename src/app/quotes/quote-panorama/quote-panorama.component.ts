import { Component, OnInit } from '@angular/core';
import {Quote} from "../quote";

@Component({
  selector: 'app-quote-panorama',
  templateUrl: './quote-panorama.component.html',
  styleUrls: ['./quote-panorama.component.css']
})
export class QuotePanoramaComponent implements OnInit {
  title: string = "七転び八起き “Fall down seven times, get up eight.”";
  textClass: string = "black_text";
  backgroundColorClass: string = "nice-red";
  currentQuote: Quote;
  colors: Array<string> = ["nice-grapefruit", "nice-deep-sky-blue", "nice-yellow", "nice-turquoise", "nice-lime-green"];

  quotes: Quote[] = [
    {
      "_id": "1",
      "description": "Fall down seven times, get up eight.",
      "author": "Japanese saying"
    },
    {
      "_id": "2",
      "description": "Mindfulness is the ability to notice where we are, physically and mentally, and bring our attention back to what is rather than being in our fantasies, fears, hopes or dreams.",
      "author": "Julia E. Wahl & Wendy Wood"
    },
    {
      "_id": "3",
      "description": "I’m convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.",
      "author": "Steve Jobs"
    }
  ];

  getQuotes(){
    return this.quotes;
  }

  getQuote(i: string){
    return this.getQuotes().find(quote => quote._id === i);
  }

  getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  selectColor(color: string): void {
    this.textClass = color;
    var contents = "selectedColor" + color;
    console.log(contents);
  }

  constructor() {
  }

  ngOnInit() {
    this.currentQuote = this.getQuote(this.getRandomInt(1, this.quotes.length).toString());
    this.backgroundColorClass = this.colors[this.getRandomInt(0, this.colors.length - 1)];
  }

}
