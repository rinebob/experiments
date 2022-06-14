import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikesTableComponent } from './strikes-table.component';

describe('StrikesTableComponent', () => {
  let component: StrikesTableComponent;
  let fixture: ComponentFixture<StrikesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrikesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrikesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
