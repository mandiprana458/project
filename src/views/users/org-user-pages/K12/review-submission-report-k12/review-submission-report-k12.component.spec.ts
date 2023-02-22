import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSubmissionReportK12Component } from './review-submission-report-k12.component';

describe('ReviewSubmissionReportK12Component', () => {
  let component: ReviewSubmissionReportK12Component;
  let fixture: ComponentFixture<ReviewSubmissionReportK12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSubmissionReportK12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmissionReportK12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
