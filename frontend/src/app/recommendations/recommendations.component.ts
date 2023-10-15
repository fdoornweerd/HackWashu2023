
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

import { HoldGlobalsService } from '../hold-globals.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit{
  @Input() user!: User;
  userId: string | null = null;
  showElement: boolean = true;



  // @Input() firstName: string = '';
  // @Input() lastName: string = '';
  // @Input() age: number | null = null;
  // @Input() proficient: string[] | null= null;
  // @Input() learning: string[] | null = null;
  // @Input() interests: string[] | null = null;
  //@Input() bio: string = '';

  constructor(private holdGlobalsService: HoldGlobalsService, private userService: UserService, private authService: AuthService) { }
  
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() moveToMatchesEvent: EventEmitter<void> = new EventEmitter<void>();


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
    });
  }

  
  moveToMatches() {
    this.showElement = false;

    if(this.userId) {
      this.userService.likeUser(parseInt(this.userId), this.user.user_id).subscribe({
        next: (response) => {
          // Handle the response, e.g., show a success message
          console.log('User liked successfully', response);
          // Check if the response indicates a match and handle it accordingly
        },
        error: (error) => {
          // Handle errors, e.g., show an error message
          console.error('Error liking user', error);
        },
      });
      
      
      
    }
    


    
    // //this.moveToMatchesEvent.emit();
    // //this.remove.emit();
    // this.holdGlobalsService.removePerson(this.id);
    // this.holdGlobalsService.addMatch(this.id);
  }

  removeRecommendation() {

    this.showElement = false;

    // this.remove.emit();
    // this.holdGlobalsService.removePerson(this.id);

  }


}






