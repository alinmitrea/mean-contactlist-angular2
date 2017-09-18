import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {Login} from "../../models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../app.component.css']
})
export class LoginComponent implements OnInit {
  colorClass: string;
  model = new Login('', '','');
  constructor(private sharedService: SharedService) {
    this.colorClass = this.sharedService.backgroundColorClass + '-text';
  }
  public isMailInvalid() {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (this.model.email !== '' && (this.model.email.length <= 5 || !EMAIL_REGEXP.test(this.model.email))) {
      return { 'Please provide a valid email': true }; //
    }
    return false;
  }
  ngOnInit() {
  }

}
