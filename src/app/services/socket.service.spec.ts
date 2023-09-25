import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';

describe('PseudoServiceWorkerService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get entries observable', () => {
    service.getEntries$().subscribe((entries) => {
      expect(entries).toEqual([]);
    });
  });

  it('should parse additional string correctly', () => {
    let result = service['parseAdditional']('1 2 3 4 5');
    expect(result).toEqual(['1', '2', '3', '4', '5']);

    result = service['parseAdditional']('1 1 1');
    expect(result).toEqual(['1']);

    result = service['parseAdditional']('   ');
    expect(result).toEqual([]);

    result = service['parseAdditional']('-1  0,,2,   ,');
    expect(result).toEqual(['0', '2']);
  });
});
