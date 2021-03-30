import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { AssignmentsFormComponent } from './assignments-form/assignments-form.component';
import { AssignmentsPageComponent } from './assignments-page/assignments-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { ClassesFormComponent } from './classes-form/classes-form.component';
import { ClassesPageComponent } from './classes-page/classes-page.component';
import { FocusZoneComponent } from './focus-zone/focus-zone.component';
import { QuotesPageComponent } from './quotes-page/quotes-page.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/organizely/home', pathMatch: 'full' },
  { path: 'organizely/home', component: AgendaComponent },
  { path: 'organizely/classes', component: ClassesPageComponent },
  { path: 'organizely/classform', component: ClassesFormComponent },
  { path: 'organizely/assignments', component: AssignmentsPageComponent },
  { path: 'organizely/assignmentform', component: AssignmentsFormComponent},
  { path: 'organizely/tasks', component: TasksPageComponent },
  { path: 'organizely/taskform', component: TasksFormComponent },
  { path: 'organizely/calendar', component: CalendarPageComponent },
  { path: 'organizely/focus-zone', component: FocusZoneComponent },
  { path: 'organizely/quotes', component: QuotesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
