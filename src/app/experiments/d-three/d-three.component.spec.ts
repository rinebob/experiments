import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DThreeComponent } from './d-three.component';

describe('DThreeComponent', () => {
  let component: DThreeComponent;
  let fixture: ComponentFixture<DThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
