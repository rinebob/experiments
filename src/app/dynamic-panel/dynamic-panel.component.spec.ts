import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPanelComponent } from './dynamic-panel.component';

describe('DynamicPanelComponent', () => {
  let component: DynamicPanelComponent;
  let fixture: ComponentFixture<DynamicPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
