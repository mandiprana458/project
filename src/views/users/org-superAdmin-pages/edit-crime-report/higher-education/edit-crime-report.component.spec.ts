import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrimeReportComponent } from './edit-crime-report.component';

describe('EditCrimeReportComponent', () => {
  let component: EditCrimeReportComponent;
  let fixture: ComponentFixture<EditCrimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCrimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCrimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
