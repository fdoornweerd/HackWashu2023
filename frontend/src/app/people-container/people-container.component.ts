import { Component } from '@angular/core';
import { MatchesComponent } from '../matches/matches.component';
import { Person } from '../Person';
import { NgFor } from '@angular/common';
import { HoldGlobalsService } from '../hold-globals.service';


@Component({
  selector: 'app-people-container',
  standalone: true,
  imports: [MatchesComponent, NgFor],
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.scss']
})
export class PeopleContainerComponent {
  matches: Person[] = [];

  constructor(private holdGlobal:HoldGlobalsService) {
    this.matches = holdGlobal.getMatches();
  }




}