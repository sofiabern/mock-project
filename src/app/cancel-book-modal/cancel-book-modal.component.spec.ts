import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBookModalComponent } from './cancel-book-modal.component';

describe('CancelBookModalComponent', () => {
  let component: CancelBookModalComponent;
  let fixture: ComponentFixture<CancelBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
