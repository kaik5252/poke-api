import { TestBed } from '@angular/core/testing';

import { HttpPokeService } from './httpPoke.service';

describe('HttpPokeService', () => {
  let service: HttpPokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
