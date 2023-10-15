import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleContainerComponent } from '../people-container/people-container.component';
import { RecommendContainerComponent } from '../recommend-container/recommend-container.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,PeopleContainerComponent, RecommendContainerComponent, AiChatComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})


export class HubComponent {
  constructor(private router: Router) { }

  signOut() {
    // Add any sign-out logic here (e.g., clearing user session)
    
    // Navigate to the home page
    this.router.navigate(['/']);

}
}
