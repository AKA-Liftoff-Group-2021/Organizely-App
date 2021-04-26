import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from './shared/models/quote.model';

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

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.url, {
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
    return this.http.delete<void>(`${this.url}/${quoteId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItme('token')}`,
      }),
    });
  }
}
