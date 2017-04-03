import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  colorClass: string = "nice-red";

  constructor(private sharedService: SharedService) {
    this.sharedService.colorClass$.subscribe(
      data => {
        console.log('quote-received data from header: ' + data);
        this.colorClass = data;
      });
  }

  ngOnInit() {
  }

}
