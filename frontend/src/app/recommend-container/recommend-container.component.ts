import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { NgFor } from '@angular/common';
import { Person } from '../Person';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recommend-container',
  standalone: true,
  imports: [CommonModule, RecommendationsComponent,NgFor],
  templateUrl: './recommend-container.component.html',
  styleUrls: ['./recommend-container.component.scss']
})





export class RecommendContainerComponent {
  people: Person[] = [];
  userId: string | null = null;
  recommendedUsers: User[] = [];



  constructor(private authService: AuthService, private userService: UserService) {

    // const person1: Person = {
    //   firstName: 'Sylvia',
    //   lastName: 'Kozub',
    //   age: 20,
    //   proficient: ['English','Polish'],
    //   learning: ['Spanish'],
    //   interests: ['Programming','Cricket','Golf'],
    //   bio: 'Love learning CS and meeting new people!',
    // };

    // const person2: Person = {
    //   firstName: 'Finn',
    //   lastName: 'Doornweerd',
    //   age: 20,
    //   proficient: ['English'],
    //   learning: ['Italian'],
    //   interests: ['Soccer','Sewing','Lifting'],
    //   bio: 'I am trying to get closer to my Italian heritage by learning Italian!',
    // };

    
    // this.people.push(person1);
    // this.people.push(person2);

    
  }

  ngOnInit(): void {
    this.authService.token$.subscribe((token) => {
      if (token) {
        console.log('found token');
        const decodedToken = this.authService.getDecodedToken(token);
        this.userId = decodedToken.userId;
      } else {
        console.log('no token');
        this.userId = null;
      }

      if (this.userId) {
        this.userService.getRecommendations(parseInt(this.userId)).subscribe({
          next: (response) => {
            this.recommendedUsers = response;
            console.log('CONTAINER Recommendations retrieved successfully', response);
            // Handle success, e.g., navigate to a different page or display a success message
          },
          error: (error) => {
            console.error('Fetching user info failed', error);
            // Handle error, e.g., display an error message to the user
          },
        });
      }

    });
  }




  removeRecommendation(user: User) {
    // Find the index of the person in the array
    const index = this.recommendedUsers.indexOf(user);

    // If the person is found in the array, remove them
    if (index !== -1) {
      this.recommendedUsers.splice(index, 1);
    }
  }


}


