import { Component, OnInit } from '@angular/core';
import { Quote} from '../quote';
import { QuoteService } from '../quote.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-quote-panorama',
  templateUrl: './quote-panorama.component.html',
  styleUrls: ['./quote-panorama.component.css', './quote-panorama.card-style.css'],
  providers: [QuoteService]
})
export class QuotePanoramaComponent implements OnInit {
  textClass = 'black_text';
  backgroundColorClass = 'nice-red';
  currentQuote: Quote = {  _id: 'ss',  quote_id: '-999',  description: 'loading', author: 'loading', category: 'age', status:'old' };
  colors: Array<string> = ['nice-grapefruit', 'nice-deep-sky-blue', 'nice-yellow', 'nice-turquoise', 'nice-lime-green'];
  fakeParse: Array<string> = ['one', 'two']; // used in quote-panorama.component.html to display the new quotes loaded with 'more'
  quotes: Quote[];
  status: string='new';
  private QUOTES_BY_CATEGORY_LIMIT: String ='10';

  constructor(private quoteService: QuoteService,  private sharedService: SharedService) {
    this.sharedService.currentQuote$.subscribe(
      data => {
        this.currentQuote = data;
     });
    this.sharedService.currentQuotesByCategory$.subscribe(
      data => {
        this.quotes = data;
      });

    var serviceQuote : Quote;
    serviceQuote = this.sharedService.getQuote();

    if (!(typeof serviceQuote === 'undefined' || serviceQuote === null)) {
      this.currentQuote = this.sharedService.getQuote();
      this.backgroundColorClass = this.sharedService.getBackgroundColorClass();
      this.quotes = this.sharedService.getQuotesByCategory();
    }
  }

  ngOnInit() {
    // get a new quote only first time (quote_id = -999 is the default loaded quote: see above)
    if (this.currentQuote.quote_id == '-999') {
      this.setNewQuote();
    }
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
    this.backgroundColorClass = this.colors[this.getRandomInt(0, this.colors.length - 1)];
    this.sharedService.publishColors(this.backgroundColorClass + '-text', this.backgroundColorClass);

    this.getRandomQuote(true);
  }

  private getRandomQuote(reset: boolean) {
    this.quoteService
      .getDBQuote(this.getRandomInt(1, 70000).toString())
      .then((quotes: Quote) => {
        this.currentQuote = quotes;
        this.getQuotesByCategory(this.currentQuote.category, reset);
      })
    ;
  }

  private getQuotesByCategory(category: string, reset: boolean) {
    this.quoteService
      .getDBQuoteByCategory(category.toString(), this.QUOTES_BY_CATEGORY_LIMIT)
      .then((quotes: Quote[]) => {
        if (reset){
          this.quotes = quotes;
        }
        else
          if (typeof this.quotes !== 'undefined'){
            this.status = this.status + '+';
            quotes.forEach((item, index) => {
              item.status = this.status;
              this.quotes.push(item)
            })
          } else{
            this.quotes = quotes;
          }
        this.publishQuote();
      })
  }

  private changeQuote(id:number){
    this.currentQuote = this.getQuote(id.toString());
    window.scrollTo(0,0);
    this.publishQuote();
  }

  private publishQuote(){
    this.sharedService.publishQuote(this.currentQuote, this.quotes);
  }
}
