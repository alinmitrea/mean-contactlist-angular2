import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../shared.service";
import {Quote} from "../quote";

@Component({
  selector: 'app-quote-category',
  templateUrl: './quote-category.component.html',
  styleUrls: ['./quote-category.component.css']
})
export class QuoteCategoryComponent implements OnInit {
  currentQuote: Quote;

  constructor(private sharedService: SharedService) {
    this.sharedService.currentQuote$.subscribe(
      data => {
        console.log('quote-category received data from quote: ' + data +  data.quote_id);
        this.currentQuote = data;
      });
  }

  ngOnInit() {
    this.currentQuote = this.sharedService.getQuote();
  }

}
