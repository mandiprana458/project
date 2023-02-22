import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSubmissionOrgSuperAdminComponent } from './review-submission-org-super-admin.component';

describe('ReviewSubmissionOrgSuperAdminComponent', () => {
  let component: ReviewSubmissionOrgSuperAdminComponent;
  let fixture: ComponentFixture<ReviewSubmissionOrgSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSubmissionOrgSuperAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmissionOrgSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
