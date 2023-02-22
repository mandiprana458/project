import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNewReportK12Component } from './submit-new-report-k12.component';

describe('SubmitNewReportK12Component', () => {
  let component: SubmitNewReportK12Component;
  let fixture: ComponentFixture<SubmitNewReportK12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitNewReportK12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNewReportK12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
