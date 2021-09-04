import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselViewerComponent } from './carousel-viewer.component';

describe('CarouselViewerComponent', () => {
  let component: CarouselViewerComponent;
  let fixture: ComponentFixture<CarouselViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
