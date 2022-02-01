import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsiUiComponent } from './rsi-ui.component';

describe('RsiUiComponent', () => {
  let component: RsiUiComponent;
  let fixture: ComponentFixture<RsiUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsiUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
