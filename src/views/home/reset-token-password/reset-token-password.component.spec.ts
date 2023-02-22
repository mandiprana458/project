import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetTokenPasswordComponent } from './reset-token-password.component';

describe('ResetTokenPasswordComponent', () => {
  let component: ResetTokenPasswordComponent;
  let fixture: ComponentFixture<ResetTokenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetTokenPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetTokenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
