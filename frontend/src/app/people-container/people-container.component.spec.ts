import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleContainerComponent } from './people-container.component';

describe('PeopleContainerComponent', () => {
  let component: PeopleContainerComponent;
  let fixture: ComponentFixture<PeopleContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleContainerComponent]
    });
    fixture = TestBed.createComponent(PeopleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
