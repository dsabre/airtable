import { TestBed } from '@angular/core/testing';

import { AirtableService } from './airtable.service';

describe('AirtableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirtableService = TestBed.get(AirtableService);
    expect(service).toBeTruthy();
  });
});
