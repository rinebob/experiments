import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeThreePanelComponent } from './dee-three-panel.component';

describe('DeeThreePanelComponent', () => {
  let component: DeeThreePanelComponent;
  let fixture: ComponentFixture<DeeThreePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeeThreePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeThreePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
