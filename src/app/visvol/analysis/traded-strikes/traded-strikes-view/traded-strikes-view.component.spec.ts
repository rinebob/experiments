import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradedStrikesViewComponent } from './traded-strikes-view.component';

describe('TradedStrikesViewComponent', () => {
  let component: TradedStrikesViewComponent;
  let fixture: ComponentFixture<TradedStrikesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradedStrikesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradedStrikesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
