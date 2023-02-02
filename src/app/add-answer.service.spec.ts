import { TestBed } from '@angular/core/testing';

import { AddAnswerService } from './add-answer.service';

describe('AddAnswerService', () => {
  let service: AddAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
