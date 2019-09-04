import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompletePage } from './auto-complete.page';

describe('AutoCompletePage', () => {
  let component: AutoCompletePage;
  let fixture: ComponentFixture<AutoCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
