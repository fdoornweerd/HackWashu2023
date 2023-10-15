import { Component, OnInit } from '@angular/core';
import { MatchesComponent } from '../matches/matches.component';
import { Person } from '../Person';
import { NgFor } from '@angular/common';
import { HoldGlobalsService } from '../hold-globals.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-people-container',
  standalone: true,
  imports: [MatchesComponent, NgFor],
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.scss']
})
export class PeopleContainerComponent {
  matches: User[] = [];
  userId: number | null = null;


  // constructor(private holdGlobal:HoldGlobalsService) {
  //   this.holdGlobal.getMatches().subscribe(
  //     (matches: Person[]) => {
  //       this.matches = matches;
  //     }
  //   );
  // }

  constructor(private userService: UserService, private authService: AuthService) {
      const person1: User = {
      user_id: 0,
      email: "x",
      first_name: 'Camilla',
      last_name: 'Giorcelli',
      age: 20,
      proficient_languages: ['English','Polish'],
      learning_languages: ['Spanish'],
      interests: ['Programming','Cricket','Golf'],
      // bio: 'Love learning CS and meeting new people!',
    };

    const person2: User = {
      user_id: 0,
      email: "x",
      first_name: 'Finn',
      last_name: 'Doornweerd',
      age: 20,
      proficient_languages: ['English'],
      learning_languages: ['Italian'],
      interests: ['Soccer','Sewing','Lifting'],
      // bio: 'I am trying to get closer to my Italian heritage by learning Italian!',
    };


    this.matches.push(person1);
    this.matches.push(person2);

  }



// In your component, you can call the checkForAllMatches function when needed.
// For example, in the ngOnInit method:

ngOnInit() {
  this.authService.token$.subscribe((token) => {
    if (token) {
      console.log('Found token');
      const decodedToken = this.authService.getDecodedToken(token);
      this.userId = decodedToken.userId;
      
      // Call the checkForAllMatches function when the token is available
      if (this.userId) {
        this.userService.checkForAllMatches(this.userId).subscribe({
          next: (response) => {
            // Handle the response, e.g., show a list of matches
            console.log('Check for all matches result:', response);
          },
          error: (error) => {
            // Handle errors, e.g., show an error message
            console.error('Error checking for all matches', error);
          },
        });
      }
    } else {
      console.log('No token');
      this.userId = null;
    }
  });
}



}