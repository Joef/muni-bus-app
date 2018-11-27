import { TestBed, inject } from '@angular/core/testing';

import { RoutesService } from './routes.service';
import { HttpClientModule } from '@angular/common/http';

describe('RoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [RoutesService]
    });
  });

  it('should be created', inject([RoutesService], (service: RoutesService) => {
    expect(service).toBeTruthy();
  }));
});
