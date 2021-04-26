import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { Quote } from '../shared/models/quote.model';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrls: ['./quotes-page.component.css'],
})
export class QuotesPageComponent implements OnInit {
  savedQuotes: Quote[] = [];

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.getSavedQuotes();
  }

  getSavedQuotes() {
    this.quotesService.getQuotes().subscribe(
      (data: Quote[]) => {
        this.savedQuotes = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onDeleteQuote(id: number) {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.quotesService.deleteQuote(id).subscribe(
        (data) => {
          let quoteIndex: number = this.savedQuotes.findIndex(
            (quote) => quote.quoteId === id
          );

          this.savedQuotes.splice(quoteIndex, 1);
        },
        (error: any) => {
          console.log(error);
        },
        () => console.log('Quote deleted successfully.')
      );
    }
  }
}
