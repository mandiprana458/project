import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { HelperService } from './helper.service';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), RouterTestingModule],
      providers: [RouterTestingModule]
    });
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
