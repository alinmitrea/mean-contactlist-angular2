import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../app.component.css']
})
export class LoginComponent implements OnInit {
  colorClass: string;
  email: string;
  constructor(private sharedService: SharedService) {
    this.colorClass = this.sharedService.backgroundColorClass + '-text';
  }
  public isValidMailFormat() {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (this.email !== '' && (this.email.length <= 5 || !EMAIL_REGEXP.test(this.email))) {
      return { 'Please provide a valid email': true };
    }

    return null;
  }
  ngOnInit() {
  }

}
