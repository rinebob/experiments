import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaUiComponent } from './ma-ui.component';

describe('MaUiComponent', () => {
  let component: MaUiComponent;
  let fixture: ComponentFixture<MaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
