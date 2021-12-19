import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3fcComponent } from './d3fc.component';

describe('D3fcComponent', () => {
  let component: D3fcComponent;
  let fixture: ComponentFixture<D3fcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3fcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3fcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
