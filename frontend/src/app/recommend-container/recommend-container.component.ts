import { Component } from '@angular/core';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { NgFor } from '@angular/common';
import { Person } from '../Person';

@Component({
  selector: 'app-recommend-container',
  standalone: true,
  imports: [RecommendationsComponent,NgFor],
  templateUrl: './recommend-container.component.html',
  styleUrls: ['./recommend-container.component.scss']
})





export class RecommendContainerComponent {
  people: Person[] = [];

  constructor() {

    const person1: Person = {
      firstName: 'Sylvia',
      lastName: 'Kozub',
      age: 20,
      proficient: ['English','Polish'],
      learning: ['Spanish'],
      interests: ['Programming','Cricket','Golf'],
      bio: 'Love learning CS and meeting new people!',
    };

    const person2: Person = {
      firstName: 'Finn',
      lastName: 'Doornweerd',
      age: 20,
      proficient: ['English'],
      learning: ['Italian'],
      interests: ['Soccer','Sewing','Lifting'],
      bio: 'I am trying to get closer to my Italian heritage by learning Italian!',
    };

    
    this.people.push(person1);
    this.people.push(person2);

    
  }
  removeRecommendation(person: Person) {
    // Find the index of the person in the array
    const index = this.people.indexOf(person);

    // If the person is found in the array, remove them
    if (index !== -1) {
      this.people.splice(index, 1);
    }
  }


}


