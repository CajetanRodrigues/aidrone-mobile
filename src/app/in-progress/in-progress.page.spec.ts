import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressPage } from './in-progress.page';

describe('InProgressPage', () => {
  let component: InProgressPage;
  let fixture: ComponentFixture<InProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
