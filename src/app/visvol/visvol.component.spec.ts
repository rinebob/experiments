import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisvolComponent } from './visvol.component';

describe('VisvolComponent', () => {
  let component: VisvolComponent;
  let fixture: ComponentFixture<VisvolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisvolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisvolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
