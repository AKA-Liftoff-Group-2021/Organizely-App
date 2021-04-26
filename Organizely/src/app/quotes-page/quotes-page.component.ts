import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrls: ['./quotes-page.component.css']
})
export class QuotesPageComponent implements OnInit {
  quotes = [
    {content: 'The price of greatness is responsibility.',
    author: 'Winston Churchill'},
    {content: 'The beginning of knowledge is the discovery of something we do not understand.',
    author: 'Frank Herbert'},
    {content: 'Those that know, do. Those that understand, teach.',
    author: 'Aristotle'},
    {content: 'Each misfortune you encounter will carry in it the seed of tomorrows good luck.',
    author: 'Og Mandino'},
    {content: "Don't wait. The time will never be just right.",
    author: 'Napoleon Hill'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
