import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleConfigComponent } from './scale-config.component';

describe('ScaleConfigComponent', () => {
  let component: ScaleConfigComponent;
  let fixture: ComponentFixture<ScaleConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
