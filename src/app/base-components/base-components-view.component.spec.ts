import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponentsViewComponent } from './base-components-view.component';

describe('BaseComponentsViewComponent', () => {
  let component: BaseComponentsViewComponent;
  let fixture: ComponentFixture<BaseComponentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseComponentsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
