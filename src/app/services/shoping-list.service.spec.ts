import { TestBed } from '@angular/core/testing';

import { ShopingListService } from './shoping-list.service';

describe('ShopingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopingListService = TestBed.get(ShopingListService);
    expect(service).toBeTruthy();
  });
});
