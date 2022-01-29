import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBuilderComponent } from './panel-builder.component';

describe('PanelBuilderComponent', () => {
  let component: PanelBuilderComponent;
  let fixture: ComponentFixture<PanelBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
