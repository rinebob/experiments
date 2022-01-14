import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsCalculatorComponent } from './bs-calculator.component';

describe('BsCalculatorComponent', () => {
  let component: BsCalculatorComponent;
  let fixture: ComponentFixture<BsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
