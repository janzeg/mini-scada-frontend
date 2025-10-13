import { TestBed } from '@angular/core/testing';

import { RecipeManagerService } from './recipe-manager-service';

describe('RecipeManagerService', () => {
  let service: RecipeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
