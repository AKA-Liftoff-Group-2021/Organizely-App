import { Component, OnInit } from '@angular/core';
import { Assignments } from '../shared/mock-data/mock-assignments';
import { Assignment } from '../shared/models/assignment.model';

@Component({
  selector: 'app-assignments-page',
  templateUrl: './assignments-page.component.html',
  styleUrls: ['./assignments-page.component.css']
})
export class AssignmentsPageComponent implements OnInit {
  assignments: Assignment[] = Assignments;

  constructor() { }

  ngOnInit(): void {
  }

}
