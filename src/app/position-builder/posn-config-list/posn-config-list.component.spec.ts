import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosnConfigListComponent } from './posn-config-list.component';

describe('PosnConfigListComponent', () => {
  let component: PosnConfigListComponent;
  let fixture: ComponentFixture<PosnConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosnConfigListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosnConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
