
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() age: number = 0;
  @Input() proficient: string[] = [];
  @Input() learning: string[] = [];
  @Input() intrests: string[] = [];
  @Input() bio: string = '';

  
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() moveToMatchesEvent: EventEmitter<void> = new EventEmitter<void>();

  removeRecommendation() {
    
    this.remove.emit();
  }

  
  moveToMatches() {
    
    this.moveToMatchesEvent.emit();
  }


}






