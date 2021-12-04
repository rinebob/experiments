import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpptysDashboardComponent } from './opptys-dashboard.component';

describe('OpptysDashboardComponent', () => {
  let component: OpptysDashboardComponent;
  let fixture: ComponentFixture<OpptysDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpptysDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpptysDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
