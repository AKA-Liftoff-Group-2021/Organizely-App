import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullCalendar/timegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';

FullCalendarModule.registerPlugins([listPlugin, timeGridPlugin]);

@NgModule({
  declarations: [AppComponent, AgendaComponent],
  imports: [BrowserModule, AppRoutingModule, FullCalendarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}