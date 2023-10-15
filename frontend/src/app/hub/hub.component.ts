import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleContainerComponent } from '../people-container/people-container.component';
import { RecommendContainerComponent } from '../recommend-container/recommend-container.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,PeopleContainerComponent, RecommendContainerComponent, AiChatComponent, NavbarComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})


export class HubComponent implements OnInit{
  userId: string | null = null;
  recommendationIds: number[] = [];

  
  constructor(private userService: UserService, private authService: AuthService) { }
  
  ngOnInit() {
    this.authService.token$.subscribe(token => {
      if (token) {
        console.log("found token");
        const decodedToken = this.authService.getDecodedToken(token);
        this.userId = decodedToken.userId;
      } else {
        console.log("no token");
        this.userId = null;
      }
    });
    
    if (this.userId) {
      this.userService.getRecommendations(parseInt(this.userId)).subscribe({
        next: (response) => {
          this.recommendationIds = response.userIds;
          console.log('Recommendations retrieved successfully', response);
          // Handle success, e.g., navigate to a different page or display a success message
        },
        error: (error) => {
          console.error('Recommendations failed', error);
          // Handle error, e.g., display an error message to the user
        }
      });
    }
    
  }
}
