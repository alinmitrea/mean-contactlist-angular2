import { Component, OnInit } from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../app.component.css']
})
export class LoginComponent implements OnInit {
  colorClass : string;
  constructor(private sharedService: SharedService) {
    this.colorClass = this.sharedService.backgroundColorClass + '-text';
  }

  ngOnInit() {
  }

}
