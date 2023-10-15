import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleContainerComponent } from '../people-container/people-container.component';
import { RecommendContainerComponent } from '../recommend-container/recommend-container.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { tap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';



@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,PeopleContainerComponent, RecommendContainerComponent, AiChatComponent, NavbarComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})


export class HubComponent implements OnInit{
  userId: string | null = null;
  nothing: number[] = [];
  recommendedUsers: User[] = [];

  constructor(private authService: AuthService, private userService: UserService) {}

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
            console.log('Recommendations retrieved successfully', response);
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

  getUserInfoForRecommendations() {
    if (this.nothing && this.nothing.length > 0) {
      const userInfoObservables = this.nothing.map((userId) =>
        this.userService.getUserInfo(userId).pipe(
          tap((response) => {
            console.log('User info retrieved for user ID:', userId, response);
          })
        )
      );
      return forkJoin(userInfoObservables);
    } else {
      return of([]);
    }
  }
  
}

