import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../shared/models/assignment.model';

@Component({
  selector: 'app-assignments-page',
  templateUrl: './assignments-page.component.html',
  styleUrls: ['./assignments-page.component.css']
})
export class AssignmentsPageComponent implements OnInit {
  assignments: Assignment[];

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.getAllAssignments();
  }

  getAllAssignments() {
    this.assignmentsService.getAssignments()
    .pipe(map(data => data.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()))
  ).subscribe(
      (data: Assignment[]) => {
          this.assignments = data;
          console.log(data);
      },
      (error: any) => {
        console.log(error);
      },
      () => console.log('All done getting your assignments.')
    );
  }

  onDeleteAssignment(id: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentsService.deleteAssignment(id).subscribe(
        (data: void) => {
          let index: number = this.assignments.findIndex(
            (assignment) => assignment.assignmentId === id
          );
          this.assignments.splice(index, 1);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

}
