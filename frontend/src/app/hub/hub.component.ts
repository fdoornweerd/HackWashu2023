import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleContainerComponent } from '../people-container/people-container.component';
import { RecommendContainerComponent } from '../recommend-container/recommend-container.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [CommonModule,PeopleContainerComponent, RecommendContainerComponent, AiChatComponent, NavbarComponent],
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})


export class HubComponent {
  
}
