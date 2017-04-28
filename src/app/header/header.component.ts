import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {Quote} from "../quotes/quote";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  colorClass: string = "nice-red";
  currentQuote: Quote;

  constructor(private sharedService: SharedService) {
    this.sharedService.colorClass$.subscribe(
      data => {
        //console.log('header received data from quote: ' + data);
        this.colorClass = data;
      });
    this.sharedService.currentQuote$.subscribe(
      data => {
        //console.log('header received data from quote: ' + data +  data.quote_id);
        this.currentQuote = data;
      });
  }

  ngOnInit() {
  }

}
