import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcChartsComponent } from './calc-charts.component';

describe('CalcChartsComponent', () => {
  let component: CalcChartsComponent;
  let fixture: ComponentFixture<CalcChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
