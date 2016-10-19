/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetContactsServiceService } from './get-contacts-service.service';

describe('Service: GetContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetContactsServiceService]
    });
  });

  it('should ...', inject([GetContactsServiceService], (service: GetContactsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
