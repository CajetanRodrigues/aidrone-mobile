import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DronesPage } from './drones.page';

describe('DronesPage', () => {
  let component: DronesPage;
  let fixture: ComponentFixture<DronesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DronesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DronesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
