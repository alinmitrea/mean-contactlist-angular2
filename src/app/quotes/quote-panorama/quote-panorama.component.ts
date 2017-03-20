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
  currentQuote: Quote;

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
    }
  ];

  getQuotes(){
    return this.quotes;
  }

  getQuote(i: string){
    return this.getQuotes().find(quote => quote._id === i);
  }

  selectColor(color: string): void {
    this.textClass = color;
    var contents = "selectedColor" + color;
    console.log(contents);
  }

  constructor() {
  }

  ngOnInit() {
    this.currentQuote = this.getQuote("1");
  }

}
