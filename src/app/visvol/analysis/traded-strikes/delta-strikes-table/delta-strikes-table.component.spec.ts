import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaStrikesTableComponent } from './delta-strikes-table.component';

describe('DeltaStrikesTableComponent', () => {
  let component: DeltaStrikesTableComponent;
  let fixture: ComponentFixture<DeltaStrikesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltaStrikesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltaStrikesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
