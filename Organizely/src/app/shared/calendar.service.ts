import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  // private date = new Subject<Date>();
  // public date$ = this.date.asObservable();

  private dateSource = new BehaviorSubject<Date>(new Date());
  currentDate = this.dateSource.asObservable();

  constructor() {}

  // emitDate(x: any) {
  //   this.date.next(x);
  // }
  changeDate(date: Date) {
    this.dateSource.next(date);
  }
}
