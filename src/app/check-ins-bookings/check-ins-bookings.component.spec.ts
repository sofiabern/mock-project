import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInsBookingsComponent } from './check-ins-bookings.component';

describe('CheckInsBookingsComponent', () => {
  let component: CheckInsBookingsComponent;
  let fixture: ComponentFixture<CheckInsBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInsBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInsBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
