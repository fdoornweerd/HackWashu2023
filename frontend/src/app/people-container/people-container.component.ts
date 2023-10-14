import { Component } from '@angular/core';
import { MatchesComponent } from '../matches/matches.component';

@Component({
  selector: 'app-people-container',
  standalone: true,
  imports: [MatchesComponent],
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.scss']
})
export class PeopleContainerComponent {
}