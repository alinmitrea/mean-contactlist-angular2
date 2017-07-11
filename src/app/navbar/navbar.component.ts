import { Component, OnInit } from '@angular/core';
import { ROUTES } from './navbar-routes.config';
import { MenuType } from './navbar.metadata';
import {SharedService} from "../shared.service";
import {Quote} from "../quotes/quote";

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [ 'navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
  colorClass = 'nice-deep-sky-blue-text';
  currentQuote: Quote;
  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true;

  constructor(private sharedService: SharedService) {
    this.sharedService.currentQuote$.subscribe(
      data => {
        //console.log('header received data from quote: ' + data +  data.quote_id);
        this.currentQuote = data;
      });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    this.brandMenu = ROUTES.filter(menuItem => menuItem.menuType === MenuType.BRAND)[0];
  }

  public get menuIcon(): string {
    return this.isCollapsed ? '☰' : '✖';
  }

  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.RIGHT
    };
  }
}
