import { TestBed } from '@angular/core/testing';

import { StudentTasksService } from './student-tasks.service';

describe('StudentTasksService', () => {
  let service: StudentTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
