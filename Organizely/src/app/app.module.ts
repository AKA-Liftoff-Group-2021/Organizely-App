import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AssignmentsPageComponent } from './assignments-page/assignments-page.component';
import { ClassesPageComponent } from './classes-page/classes-page.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { FocusZoneComponent } from './focus-zone/focus-zone.component';
import { QuotesPageComponent } from './quotes-page/quotes-page.component';
import { FormsModule } from '@angular/forms';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { DayStringPipe } from './shared/day-string.pipe';
import { StandardTimePipe } from './shared/standard-time.pipe';

FullCalendarModule.registerPlugins([listPlugin, timeGridPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    NavbarComponent,
    AssignmentsPageComponent,
    ClassesPageComponent,
    TasksPageComponent,
    CalendarPageComponent,
    FocusZoneComponent,
    QuotesPageComponent,
    ClassesFormComponent,
    DayStringPipe,
    StandardTimePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FullCalendarModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
