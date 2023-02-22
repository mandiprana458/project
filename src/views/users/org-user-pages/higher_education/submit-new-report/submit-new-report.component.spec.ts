import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNewReportComponent } from './submit-new-report.component';

describe('SubmitNewReportComponent', () => {
  let component: SubmitNewReportComponent;
  let fixture: ComponentFixture<SubmitNewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitNewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
