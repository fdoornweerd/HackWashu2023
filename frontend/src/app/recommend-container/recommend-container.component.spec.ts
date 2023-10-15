import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from '../Person';
import { RecommendContainerComponent } from './recommend-container.component';

describe('RecommendContainerComponent', () => {
  let component: RecommendContainerComponent;
  let fixture: ComponentFixture<RecommendContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecommendContainerComponent]
    });
    fixture = TestBed.createComponent(RecommendContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

});
