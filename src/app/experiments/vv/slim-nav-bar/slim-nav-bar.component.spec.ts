import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimNavBarComponent } from './slim-nav-bar.component';

describe('SlimNavBarComponent', () => {
  let component: SlimNavBarComponent;
  let fixture: ComponentFixture<SlimNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlimNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlimNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
