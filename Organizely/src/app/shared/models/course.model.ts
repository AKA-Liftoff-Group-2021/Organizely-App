import { Assignment } from './assignment.model';

export interface Course {
  id?: string;
  name: string;
  days: number[];
  endTime: string;
  startTime: string;
  // assignments: Assignment[];
  assignments: string[];
  semester: string;
}
