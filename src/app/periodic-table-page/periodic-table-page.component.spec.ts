import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicTablePageComponent } from './periodic-table-page.component';

describe('PeriodicTablePageComponent', () => {
  let component: PeriodicTablePageComponent;
  let fixture: ComponentFixture<PeriodicTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodicTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodicTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
