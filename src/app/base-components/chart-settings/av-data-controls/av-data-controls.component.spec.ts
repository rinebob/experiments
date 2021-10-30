import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvDataControlsComponent } from './av-data-controls.component';

describe('AvDataControlsComponent', () => {
  let component: AvDataControlsComponent;
  let fixture: ComponentFixture<AvDataControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvDataControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvDataControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
