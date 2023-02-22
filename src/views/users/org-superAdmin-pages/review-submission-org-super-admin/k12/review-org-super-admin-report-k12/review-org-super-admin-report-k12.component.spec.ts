import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrgSuperAdminReportK12Component } from './review-org-super-admin-report-k12.component';

describe('ReviewOrgSuperAdminReportK12Component', () => {
  let component: ReviewOrgSuperAdminReportK12Component;
  let fixture: ComponentFixture<ReviewOrgSuperAdminReportK12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewOrgSuperAdminReportK12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrgSuperAdminReportK12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
