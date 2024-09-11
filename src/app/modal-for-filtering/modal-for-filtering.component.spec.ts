import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForFilteringComponent } from './modal-for-filtering.component';

describe('ModalForFilteringComponent', () => {
  let component: ModalForFilteringComponent;
  let fixture: ComponentFixture<ModalForFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalForFilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalForFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
