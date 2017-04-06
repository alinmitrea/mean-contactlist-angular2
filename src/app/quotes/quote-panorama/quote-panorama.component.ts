import { Component, OnInit } from '@angular/core';
import { Quote} from '../quote';
import { QuoteService } from '../quote.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-quote-panorama',
  templateUrl: './quote-panorama.component.html',
  styleUrls: ['./quote-panorama.component.css'],
  providers: [QuoteService]
})
export class QuotePanoramaComponent implements OnInit {
  textClass = 'black_text';
  backgroundColorClass = 'nice-red';
  currentQuote: Quote = {  _id: 'ss',  quote_id: '999',  description: 'loading', author: 'loading', category: 'age' };
  colors: Array<string> = ['nice-grapefruit', 'nice-deep-sky-blue', 'nice-yellow', 'nice-turquoise', 'nice-lime-green'];
  quotes: Quote[];
  quoteSample: Quote;

  constructor(private quoteService: QuoteService,  private sharedService: SharedService) {
  }

  ngOnInit() {
    // this.quoteService
    //   .getDBQuotes()
    //   .then((quotes: Quote[]) => {
    //     this.quotes = quotes.map((quote) => {
    //       // const contents = 'quotes initialized';
    //       // console.log(contents);
    //       return quote;
    //     });
    //   });

    this.setNewQuote();
  }

  getQuotes() {
    return this.quotes;
  }

  getQuote(i: string) {
    return this.getQuotes().find(quote => quote.quote_id === i);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  selectColor(color: string): void {
    this.textClass = color;
    const contents = 'selectedColor' + color;
    console.log(contents);
  }

  setNewQuote(): void {
    // this.currentQuote = this.getQuote(this.getRandomInt(0, this.quotes.length - 1).toString());
    this.backgroundColorClass = this.colors[this.getRandomInt(0, this.colors.length - 1)];
    this.sharedService.publishData(this.backgroundColorClass + '-text');

    this.getRandomQuote();
    // const contents = 'quoteSample';
    // console.log(contents + this.currentQuote.description);

  }

  private getRandomQuote() {
    this.quoteService
      .getDBQuote(this.getRandomInt(1, 70000).toString())
      .then((quotes: Quote) => {
        this.currentQuote = quotes;
        this.getQuotesByCategory(this.currentQuote.category);
      })
    ;
  }

  private getQuotesByCategory(category: string) {
    this.quoteService
      .getDBQuoteByCategory(category.toString())
      .then((quotes: Quote[]) => {
        this.quotes = quotes;
      });
  }

  private changeQuote(id:number){
    const contents = 'changeQuote';
    this.currentQuote = this.getQuote(id.toString());
    window.scrollTo(0,0);
    console.log(contents + ':' + id);
  }
}
