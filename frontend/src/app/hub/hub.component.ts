import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleContainerComponent } from '../people-container/people-container.component';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,PeopleContainerComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent {

}
