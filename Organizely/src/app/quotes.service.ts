import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  url = 'https://api.quotable.io/random';
  quotes = [];

  constructor(private http: HttpClient) {
    this.http.get(this.url).toPromise().then(data => {
      this.quotes.push(data);
   });
  }

  getQuote() {
    return this.quotes;
  }

}
