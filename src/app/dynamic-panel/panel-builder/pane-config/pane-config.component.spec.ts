import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneConfigComponent } from './pane-config.component';

describe('PaneConfigComponent', () => {
  let component: PaneConfigComponent;
  let fixture: ComponentFixture<PaneConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaneConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaneConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
