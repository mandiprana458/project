import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexualAssaultComponent } from './sexual-assault.component';

describe('SexualAssaultComponent', () => {
  let component: SexualAssaultComponent;
  let fixture: ComponentFixture<SexualAssaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexualAssaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexualAssaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
