import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {

}

/*import { PersonService } from './person.service'; // Import your service

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  people: any[] = [];

  constructor(private personService: PersonService) {} // Inject your service

  ngOnInit() {
    this.personService.getPeople().subscribe((data: any[]) => {
      this.people = data; // Populate the people array with data from your service
    });
  }
}
*/





