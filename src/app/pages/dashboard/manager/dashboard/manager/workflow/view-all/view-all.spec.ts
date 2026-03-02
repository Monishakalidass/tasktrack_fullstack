import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAll } from './view-all';

describe('ViewAll', () => {
  let component: ViewAll;
  let fixture: ComponentFixture<ViewAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAll],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
