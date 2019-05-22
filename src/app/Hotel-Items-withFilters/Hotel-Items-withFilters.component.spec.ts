/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HotelItemsWithFiltersComponent } from './Hotel-Items-withFilters.component';

describe('HotelItemsWithFiltersComponent', () => {
  let component: HotelItemsWithFiltersComponent;
  let fixture: ComponentFixture<HotelItemsWithFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelItemsWithFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelItemsWithFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
