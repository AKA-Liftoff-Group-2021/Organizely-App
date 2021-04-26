import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from './models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  quotesApiUrl = 'https://api.quotable.io/random';
  databaseUrl = 'https://localhost:44394/api/Quotes';
  quotes = [];

  constructor(private http: HttpClient) {
    this.http
      .get(this.quotesApiUrl)
      .toPromise()
      .then((data) => {
        this.quotes.push(data);
      });
  }

  getQuote() {
    return this.quotes;
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.databaseUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  saveQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.databaseUrl, quote, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  deleteQuote(quoteId: number): Observable<void> {
    return this.http.delete<void>(`${this.databaseUrl}/${quoteId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
