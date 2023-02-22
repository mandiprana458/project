import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReportK12Component } from './edit-report-k12.component';

describe('EditReportK12Component', () => {
  let component: EditReportK12Component;
  let fixture: ComponentFixture<EditReportK12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReportK12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReportK12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
