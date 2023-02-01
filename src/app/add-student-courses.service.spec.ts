import { TestBed } from '@angular/core/testing';

import { AddStudentCoursesService } from './add-student-courses.service';

describe('AddStudentCoursesService', () => {
  let service: AddStudentCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddStudentCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
