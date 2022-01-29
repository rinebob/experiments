import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesConfigComponent } from './series-config.component';

describe('SeriesConfigComponent', () => {
  let component: SeriesConfigComponent;
  let fixture: ComponentFixture<SeriesConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
