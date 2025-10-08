import { TestBed } from '@angular/core/testing';

import { WebSocketManagerService } from './web-socket-manager-service';

describe('WebSocketManagerService', () => {
  let service: WebSocketManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
