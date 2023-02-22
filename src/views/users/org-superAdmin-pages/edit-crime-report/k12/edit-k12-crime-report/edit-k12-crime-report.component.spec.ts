import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditK12CrimeReportComponent } from './edit-k12-crime-report.component';

describe('EditK12CrimeReportComponent', () => {
  let component: EditK12CrimeReportComponent;
  let fixture: ComponentFixture<EditK12CrimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditK12CrimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditK12CrimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
