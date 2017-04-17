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
  currentQuote: Quote = {  _id: 'ss',  quote_id: '999',  description: 'loading', author: 'loading', category: 'age', status:'old' };
  colors: Array<string> = ['nice-grapefruit', 'nice-deep-sky-blue', 'nice-yellow', 'nice-turquoise', 'nice-lime-green'];
  fakeParse: Array<string> = ['one', 'two'];
  quotes: Quote[];
  status: string='new';

  constructor(private quoteService: QuoteService,  private sharedService: SharedService) {
  }

  ngOnInit() {
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

    this.getRandomQuote(true);
    // const contents = 'quoteSample';
    // console.log(contents + this.currentQuote.description);

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
      .getDBQuoteByCategory(category.toString())
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
      })
  }

  private changeQuote(id:number){
    this.currentQuote = this.getQuote(id.toString());
    window.scrollTo(0,0);
  }
}
