import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaStrikesGridComponent } from './delta-strikes-grid.component';

describe('DeltaStrikesGridComponent', () => {
  let component: DeltaStrikesGridComponent;
  let fixture: ComponentFixture<DeltaStrikesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltaStrikesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltaStrikesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
