import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceUiComponent } from './datasource-ui.component';

describe('DatasourceUiComponent', () => {
  let component: DatasourceUiComponent;
  let fixture: ComponentFixture<DatasourceUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasourceUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
