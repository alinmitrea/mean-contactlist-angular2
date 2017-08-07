import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';
import {Quote} from '../quote';
import {QuoteService} from '../quote.service';
import {Category} from "../category";

@Component({
  selector: 'app-quote-category',
  templateUrl: './quote-category.component.html',
  styleUrls: ['./quote-category.component.css', './../../app.component.css'],
  providers: [QuoteService]
})
export class QuoteCategoryComponent implements OnInit {
  currentQuote: Quote;
  currentQuotesByCategory : Quote[];
  categories: Category[];
  private QUOTES_BY_CATEGORY_LIMIT: String ='11';
  constructor(private sharedService: SharedService, private quoteService: QuoteService) {
    this.sharedService.currentQuote$.subscribe(
      data => {
        //console.log('quote-category received data from quote: ' + data +  data.quote_id);
        this.currentQuote = data;
      });
  }

  ngOnInit() {
    this.currentQuote = this.sharedService.getQuote();
    this.getCategories();
  }
  private getCategories() {
    this.quoteService
      .getDBCategories()
      .then((categories: Category[]) => {
        this.categories = categories;
      })
    ;
  }

  private getQuotesByCategory(category: string) {
    //console.log('quote-category: getQuotesByCategory>>' + category);
    this.quoteService
      .getDBQuoteByCategory(category.toString(), this.QUOTES_BY_CATEGORY_LIMIT)
      .then((quotes: Quote[]) => {
          this.currentQuotesByCategory = quotes;
          this.currentQuote = this.currentQuotesByCategory.pop();
          //console.log('quote-category: getQuotesByCategory>>' + this.currentQuote.description);
          this.sharedService.publishQuote(this.currentQuote, this.currentQuotesByCategory);
      })
  }


}
