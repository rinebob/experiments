import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbUiComponent } from './bb-ui.component';

describe('BbUiComponent', () => {
  let component: BbUiComponent;
  let fixture: ComponentFixture<BbUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
