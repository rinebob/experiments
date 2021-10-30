import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataControlsComponent } from './data-controls.component';

describe('DataControlsComponent', () => {
  let component: DataControlsComponent;
  let fixture: ComponentFixture<DataControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
