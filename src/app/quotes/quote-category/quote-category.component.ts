import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared.service';
import {Quote} from '../quote';
import {QuoteService} from '../quote.service';
import {Category} from "../category";

@Component({
  selector: 'app-quote-category',
  templateUrl: './quote-category.component.html',
  styleUrls: ['./quote-category.component.css'],
  providers: [QuoteService]
})
export class QuoteCategoryComponent implements OnInit {
  currentQuote: Quote;
  categories: Category[];
  constructor(private sharedService: SharedService, private quoteService: QuoteService) {
    this.sharedService.currentQuote$.subscribe(
      data => {
        console.log('quote-category received data from quote: ' + data +  data.quote_id);
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


}
