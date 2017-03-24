import { Injectable } from '@angular/core';
import { Quote } from './quote';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuoteService {
  private quotesUrl = '/api/quotes';

  constructor (private http: Http) {}

  // get("/api/quotes")
  getQuotes(): Promise<Quote[]> {
    return this.http.get(this.quotesUrl)
      .toPromise()
      .then(response => response.json() as Quote[])
      .catch(this.handleError);
  }

  // get("/api/quotes/quote_id/:id")
  getQuote(i: String): Promise<String> {
    return this.http.get('/api/quotes/quote_id/2')
      .toPromise()
      .then(response => response.json() as Quote)
      .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app
  //
  // // delete("/api/contacts/:id")
  // deleteContact(delContactId: String): Promise<String> {
  //   return this.http.delete(this.contactsUrl + '/' + delContactId)
  //     .toPromise()
  //     .then(response => response.json() as String)
  //     .catch(this.handleError);
  // }


  // post("/api/quotes")
  createQuote(newQuote: Quote): Promise<Quote> {
    return this.http.post(this.quotesUrl, newQuote)
      .toPromise()
      .then(response => response.json() as Quote)
      .catch(this.handleError);
  }

  // get("/api/quotes/:id") endpoint not used by Angular app

  // delete("/api/quotes/:id")
  deleteQuote(delQuoteId: String): Promise<String> {
    return this.http.delete(this.quotesUrl + '/' + delQuoteId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/quotes/:id")
  updateQuote(putQuote: Quote): Promise<Quote> {
    var putUrl = this.quotesUrl + '/' + putQuote._id;
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
