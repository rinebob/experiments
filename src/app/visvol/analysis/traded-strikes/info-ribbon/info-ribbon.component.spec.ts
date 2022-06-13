import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRibbonComponent } from './info-ribbon.component';

describe('InfoRibbonComponent', () => {
  let component: InfoRibbonComponent;
  let fixture: ComponentFixture<InfoRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRibbonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
