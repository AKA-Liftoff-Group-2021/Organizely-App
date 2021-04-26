import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from './models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  url = 'https://api.quotable.io/random';
  databaseUrl = 'https://localhost:44394/api/Quotes';
  quotes = [];

  constructor(private http: HttpClient) {
    this.http
      .get(this.url)
      .toPromise()
      .then((data) => {
        this.quotes.push(data);
      });
  }

  getQuote() {
    return this.quotes;
  }

  saveQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.databaseUrl, quote, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
