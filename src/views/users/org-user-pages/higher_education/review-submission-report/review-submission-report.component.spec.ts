import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSubmissionReportComponent } from './review-submission-report.component';

describe('ReviewSubmissionReportComponent', () => {
  let component: ReviewSubmissionReportComponent;
  let fixture: ComponentFixture<ReviewSubmissionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSubmissionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmissionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
