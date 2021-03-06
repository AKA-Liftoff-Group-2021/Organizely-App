import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private dateSource = new BehaviorSubject<Date>(new Date());
  currentDate = this.dateSource.asObservable();

  constructor() {}

  changeDate(date: Date) {
    this.dateSource.next(date);
  }
}
