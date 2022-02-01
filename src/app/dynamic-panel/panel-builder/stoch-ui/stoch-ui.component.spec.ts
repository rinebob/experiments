import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StochUiComponent } from './stoch-ui.component';

describe('StochUiComponent', () => {
  let component: StochUiComponent;
  let fixture: ComponentFixture<StochUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StochUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StochUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
