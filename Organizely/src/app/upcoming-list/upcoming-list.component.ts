import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { CalendarService } from '../shared/calendar.service';
import { Assignment } from '../shared/models/assignment.model';
import { StudentTask } from '../shared/models/student-task.model';
import { StudentTasksService } from '../shared/student-tasks.service';
import createUpcomingList from '../shared/utils/createUpcomingList';

@Component({
  selector: 'app-upcoming-list',
  templateUrl: './upcoming-list.component.html',
  styleUrls: ['./upcoming-list.component.css'],
})
export class UpcomingListComponent implements OnInit, OnDestroy {
  assignments: Assignment[] = [];
  studentTasks: StudentTask[] = [];

  upcomingEvents;

  currentDate: Date;
  nextWeekDate: Date;
  weekAfterNextDate: Date;

  upcomingListSub: Subscription;

  constructor(
    private calendarService: CalendarService,
    private assignmentsService: AssignmentsService,
    private studentTasksService: StudentTasksService
  ) {}

  ngOnInit(): void {
    this.assignmentsService
      .getAssignments()
      .subscribe((assignments: Assignment[]) => {
        this.assignments = assignments;

        this.studentTasksService
          .getStudentTasks()
          .subscribe((studentTasks: StudentTask[]) => {
            this.studentTasks = studentTasks;

            this.upcomingListSub = this.calendarService.currentDate.subscribe(
              (date) => {
                this.currentDate = new Date(date);

                let newDate = new Date(this.currentDate);

                let dateOneCalculation = newDate.setDate(newDate.getDate() + 7);
                this.nextWeekDate = new Date(dateOneCalculation);

                let dateTwoCalculation = newDate.setDate(newDate.getDate() + 7);
                this.weekAfterNextDate = new Date(dateTwoCalculation);

                this.upcomingEvents = createUpcomingList(
                  this.nextWeekDate,
                  this.weekAfterNextDate,
                  this.assignments,
                  this.studentTasks
                );
              }
            );
          });
      });
  }

  ngOnDestroy() {
    this.upcomingListSub.unsubscribe();
  }
}
