import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

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
import { ClassesFormComponent } from './classes-form/classes-form.component';

import { DayStringPipe } from './shared/day-string.pipe';
import { StandardTimePipe } from './shared/standard-time.pipe';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { AssignmentsFormComponent } from './assignments-form/assignments-form.component';
import { DatePipe } from '@angular/common';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UpcomingListComponent } from './upcoming-list/upcoming-list.component';

import * as $ from 'jquery';
import { ajax } from "jquery";
import { AnonymousLayoutComponent } from './anonymous-layout/anonymous-layout.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';



FullCalendarModule.registerPlugins([
  listPlugin,
  timeGridPlugin,
  interactionPlugin,
]);

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
    TasksFormComponent,
    AssignmentsFormComponent,
    SignupPageComponent,
    SignupFormComponent,
    LoginPageComponent,
    LoginFormComponent,
    UpcomingListComponent,
    AnonymousLayoutComponent,
    AuthenticatedLayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
