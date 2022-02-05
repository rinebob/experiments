import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionTileComponent } from './position-tile.component';

describe('PositionTileComponent', () => {
  let component: PositionTileComponent;
  let fixture: ComponentFixture<PositionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
