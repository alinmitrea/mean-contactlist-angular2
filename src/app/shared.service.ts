import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Quote} from "./quotes/quote";


@Injectable()
export class SharedService {
  // Observable string sources
  private currentQuote = new Subject<Quote>();
  private currentQuotesByCategory = new Subject<Quote[]>();

  private currentQuoteData : Quote;
  private currentQuotesByCategoryData : Quote[];


  // Observable string streams
  currentQuote$ = this.currentQuote.asObservable();
  currentQuotesByCategory$ = this.currentQuotesByCategory.asObservable();
  backgroundColorClass = 'nice-deep-sky-blue';


  publishQuote(currentQuote: Quote, quotesByCategory: Quote[]) {
    this.currentQuote.next(currentQuote);
    this.currentQuoteData = currentQuote;

    this.currentQuotesByCategory.next(quotesByCategory);
    this.currentQuotesByCategoryData = quotesByCategory;
  }

  getQuote(){
    return this.currentQuoteData;
  }

  getQuotesByCategory(){
    return this.currentQuotesByCategoryData;
  }
}
