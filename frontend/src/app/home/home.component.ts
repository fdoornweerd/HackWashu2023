import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }



  getUserInfo() {
    console.log('Getting user info');
    const userId = 18;
    //const userId = this.authService.getUserIdFromToken();
    console.log(userId);

    this.userService.getUserInfo(userId).subscribe({
      next: (response) => {
        console.log('User info retrieved successfully', response);
        // Handle success, e.g., navigate to a different page or display a success message
      },
      error: (error) => {
        console.error('User info retrieval failed', error);
        // Handle error, e.g., display an error message to the user
      }
    });

  }

  recommendationIds: number[] = [];

  getRecs() {
    console.log('Getting recommendations');
    const userId = 23;
    //const userId = this.authService.getUserIdFromToken();
    console.log(userId);

    this.userService.getRecommendations(userId).subscribe({
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
