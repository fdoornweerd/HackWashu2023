import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilesComponent } from './editprofiles.component';

describe('EditprofilesComponent', () => {
  let component: EditprofilesComponent;
  let fixture: ComponentFixture<EditprofilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditprofilesComponent]
    });
    fixture = TestBed.createComponent(EditprofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
