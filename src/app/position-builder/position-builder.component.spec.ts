import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionBuilderComponent } from './position-builder.component';

describe('PositionBuilderComponent', () => {
  let component: PositionBuilderComponent;
  let fixture: ComponentFixture<PositionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
