import { Injectable } from '@angular/core';
import { Person } from './Person';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class HoldGlobalsService {
  recomendations: Person[] = [];
  matches: Person[] = [];


  setRecomendations(value: Person[]) {
    this.recomendations = value;
  }

  getRecomendations() {
    return this.recomendations;
  }

  removePerson(id: number) {
    const indexToRemove = this.recomendations.findIndex(person => person.id === id);
  
    if (indexToRemove !== -1) {
      this.recomendations.splice(indexToRemove, 1);
    }
  }

  setMatches(values: Person[]) {
    this.matches = values;
  }

  getMatches(): Observable<Person[]> {
    return of(this.matches);
  }

  addMatch(id: number) {

  }

}