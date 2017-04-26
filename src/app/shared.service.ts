import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import {Quote} from "./quotes/quote";


@Injectable()
export class SharedService {
  // Observable string sources
  private colorClass = new Subject<string>();
  private colorBackgroundClass = new Subject<string>();
  private currentQuote = new Subject<Quote>();
  private currentQuotesByCategory = new Subject<Quote[]>();

  private currentColorClassData : string;
  private currentBackgroundColorClass : string;
  private currentQuoteData : Quote;
  private currentQuotesByCategoryData : Quote[];


  // Observable string streams
  colorClass$ = this.colorClass.asObservable();
  colorBackgroundClass$ = this.colorBackgroundClass.asObservable();
  currentQuote$ = this.currentQuote.asObservable();
  currentQuotesByCategory$ = this.currentQuotesByCategory.asObservable();

  // Service message commands
  publishColors(data: string, data2: string) {
    this.colorClass.next(data);
    this.currentColorClassData = data;

    this.currentBackgroundColorClass = data2;
    this.colorBackgroundClass.next(data2);
  }

  publishQuote(currentQuote: Quote, quotesByCategory: Quote[]) {
    this.currentQuote.next(currentQuote);
    this.currentQuoteData = currentQuote;

    this.currentQuotesByCategory.next(quotesByCategory);
    this.currentQuotesByCategoryData = quotesByCategory;
  }

  getQuote(){
    return this.currentQuoteData;
  }

  getColorClass(){
    return this.currentColorClassData;
  }

  getBackgroundColorClass(){
    return this.currentBackgroundColorClass;
  }

  getQuotesByCategory(){
    return this.currentQuotesByCategoryData;
  }

  // publishColors(data: string) {
  //     console.log('Inside publish data: ' + data);
  //     this.caseNumber = data;
  // }

  // subscribeData() {
  //     console.log('Inside subscribeData: ' + this.caseNumber);
  //     return this.caseNumber;
  // }
}
