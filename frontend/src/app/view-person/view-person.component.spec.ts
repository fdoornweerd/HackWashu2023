import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonComponent } from './view-person.component';

describe('ViewPersonComponent', () => {
  let component: ViewPersonComponent;
  let fixture: ComponentFixture<ViewPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewPersonComponent]
    });
    fixture = TestBed.createComponent(ViewPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
