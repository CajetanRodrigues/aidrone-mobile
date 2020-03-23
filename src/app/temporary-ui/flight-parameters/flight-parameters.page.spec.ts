import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightParametersPage } from './flight-parameters.page';

describe('FlightParametersPage', () => {
  let component: FlightParametersPage;
  let fixture: ComponentFixture<FlightParametersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightParametersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightParametersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
