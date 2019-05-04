import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupPage } from './lineup.page';

describe('LineupPage', () => {
  let component: LineupPage;
  let fixture: ComponentFixture<LineupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
