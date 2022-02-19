import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacdUiComponent } from './macd-ui.component';

describe('MacdUiComponent', () => {
  let component: MacdUiComponent;
  let fixture: ComponentFixture<MacdUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacdUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacdUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
