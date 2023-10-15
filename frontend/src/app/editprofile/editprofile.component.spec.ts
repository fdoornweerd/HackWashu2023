import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesetupComponent } from './editprofile.component';

describe('EditprofileComponent', () => {
  let component: ProfilesetupComponent;
  let fixture: ComponentFixture<ProfilesetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilesetupComponent]
    });
    fixture = TestBed.createComponent(ProfilesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
