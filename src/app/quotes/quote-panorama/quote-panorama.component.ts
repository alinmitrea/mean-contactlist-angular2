import { Component, OnInit } from '@angular/core';
import { Quote} from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote-panorama',
  templateUrl: './quote-panorama.component.html',
  styleUrls: ['./quote-panorama.component.css'],
  providers: [QuoteService]
})
export class QuotePanoramaComponent implements OnInit {
  textClass: string = "black_text";
  backgroundColorClass: string = "nice-red";
  currentQuote: Quote = {  _id: "ss",  quote_id: "999",  description: "loading", author: "loading"};
  colors: Array<string> = ["nice-grapefruit", "nice-deep-sky-blue", "nice-yellow", "nice-turquoise", "nice-lime-green"];
  quotes: Quote[];

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService
      .getQuotes()
      .then((quotes: Quote[]) => {
        this.quotes = quotes.map((quote) => {
          var contents = "quotes initialized";
          console.log(contents);
          return quote;
        });
        this.setNewQuote();
      });
    // this.quoteService
    //   .getQuote("2")
    //   .then((quotes: Quote) => {
    //     this.selectedQuote = quotes;
    //   })
    // ;
  }

  getQuotes(){
    return this.quotes;
  }

  getQuote(i: string){
    return this.getQuotes().find(quote => quote.quote_id === i);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  selectColor(color: string): void {
    this.textClass = color;
    var contents = "selectedColor" + color;
    console.log(contents);
  }

  setNewQuote(): void {
    this.currentQuote = this.getQuote(this.getRandomInt(1, this.quotes.length).toString());
    this.backgroundColorClass = this.colors[this.getRandomInt(0, this.colors.length - 1)];
    var contents = "new quote set";
    console.log(contents + this.currentQuote.description);
  }

}
