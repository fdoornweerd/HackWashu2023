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

    const person3: Person = {
      firstName: 'Finn',
      lastName: 'Doornweerd',
      age: 20,
      proficient: ['English'],
      learning: ['Italian'],
      interests: ['Soccer',' Sewing',' Lifting'],
      blurb: 'I am trying to get closer to my Italian heritage by learning Italian!',
      bio: "I'm Finn Doornweerd, a 20-year-old on an exhilarating journey of self-discovery and cultural exploration. Proficient in English, I have embarked on a mission to connect with my Italian heritage by immersing myself in the melodious world of the Italian language. This pursuit is more than just a linguistic challenge; it's a heartfelt endeavor to bridge the gap between generations and embrace the traditions and stories of my Italian ancestors. As I navigate the intricacies of this beautiful language, I find myself not only learning words but also unraveling the rich tapestry of a culture that has been a part of my family's history for generations. Beyond my linguistic aspirations, I am a passionate enthusiast of the beautiful game, soccer. The way a soccer ball dances across the pitch, connecting with players in a universal language, mirrors the spirit of connection that I seek in my cultural exploration. Whether it's watching a thrilling match or kicking the ball around with friends, soccer is more than just a sport; it's a conduit for shared experiences and unforgettable moments. Sewing, on the other hand, provides me with a canvas for creativity and self-expression. It's a remarkable journey into the world of fabric and design, where each stitch is a testament to patience and precision. The art of sewing allows me to take the thoughts and ideas that swirl in my mind and transform them into tangible creations, whether it's a piece of clothing, a stylish accessory, or a unique home decor item. Additionally, I find my solace and strength in the world of weightlifting. Lifting weights is not merely about physical strength; it's about discipline, determination, and pushing the boundaries of what I thought was possible. It's a journey of self-discovery and resilience, where every repetition brings me closer to my personal goals and builds a mindset of determination that extends beyond the weight room.",
      email: 'finnyfoo@gmail.com',
      number: '666-666-6662',
      id: 11
    };

    

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


