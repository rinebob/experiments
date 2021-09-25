import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosnConfigDetailComponent } from './posn-config-detail.component';

describe('PosnConfigDetailComponent', () => {
  let component: PosnConfigDetailComponent;
  let fixture: ComponentFixture<PosnConfigDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosnConfigDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosnConfigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
