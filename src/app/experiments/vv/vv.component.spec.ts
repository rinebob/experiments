import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VvComponent } from './vv.component';

describe('VvComponent', () => {
  let component: VvComponent;
  let fixture: ComponentFixture<VvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
