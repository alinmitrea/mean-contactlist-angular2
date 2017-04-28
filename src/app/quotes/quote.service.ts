import { Injectable } from '@angular/core';
import { Quote } from './quote';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Category} from "./category";

@Injectable()
export class QuoteService {
  private quotesUrl = '/api/quotes';
  private oneQuoteUrl = '/api/quotes/quote_id/';
  private categoryQuoteUrl = '/api/quotes/category/';

  constructor (private http: Http) {}

  // get("/api/quotes")
  getDBQuotes(): Promise<Quote[]> {
    return this.http.get(this.quotesUrl)
      .toPromise()
      .then(response => response.json() as Quote[])
      .catch(this.handleError);
  }
  // get("/api/quotes/categories")
  getDBCategories(): Promise<Category[]> {
    return this.http.get(this.quotesUrl + '/categories')
      .toPromise()
      .then(response => response.json() as Category[])
      .catch(this.handleError);
  }
  // get("/api/quotes/category/:category/:limit")
  getDBQuoteByCategory(category: String, limit: String): Promise<Quote[]> {
    return this.http.get(this.categoryQuoteUrl + category + '/' + limit)
      .toPromise()
      .then(response => response.json() as Quote[])
      .catch(this.handleError);
  }
  // get("/api/quotes/quote_id/:id")
  getDBQuote(i: String): Promise<Quote> {
    return this.http.get(this.oneQuoteUrl + i)
      .toPromise()
      .then(response => response.json() as Quote)
      .catch(this.handleError);
  }

  // post("/api/quotes")
  createQuote(newQuote: Quote): Promise<Quote> {
    return this.http.post(this.quotesUrl, newQuote)
      .toPromise()
      .then(response => response.json() as Quote)
      .catch(this.handleError);
  }

  // delete("/api/quotes/:id")
  deleteQuote(delQuoteId: String): Promise<String> {
    return this.http.delete(this.quotesUrl + '/' + delQuoteId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/quotes/:id")
  updateQuote(putQuote: Quote): Promise<Quote> {
    const putUrl = this.quotesUrl + '/' + putQuote._id;
    return this.http.put(putUrl, putQuote)
      .toPromise()
      .then(response => response.json() as Quote)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
