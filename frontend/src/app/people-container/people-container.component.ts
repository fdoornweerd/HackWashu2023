import { Component } from '@angular/core';
import { MatchesComponent } from '../matches/matches.component';
import { Person } from '../Person';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-people-container',
  standalone: true,
  imports: [MatchesComponent, NgFor],
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.scss']
})
export class PeopleContainerComponent {
  matches: Person[] = [];

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

    
    this.matches.push(person1);
    this.matches.push(person2);
  }


}