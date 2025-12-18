import { TestBed } from '@angular/core/testing';

import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  let service: DatePicker;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePicker);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
