
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HoldGlobalsService } from '../hold-globals.service';

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
  @Input() interests: string[] = [];
  @Input() blurb: string = '';
  @Input() id: number = 0;
  contact: boolean = false;

  constructor(private holdGlobalsService: HoldGlobalsService) { }
  
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() moveToMatchesEvent: EventEmitter<void> = new EventEmitter<void>();

  
  moveToMatches() {
    
    //this.moveToMatchesEvent.emit();
    //this.remove.emit();
    this.holdGlobalsService.removePerson(this.id);
    this.holdGlobalsService.addMatch(this.id);
  }

  removeRecommendation() {

    //this.remove.emit();
    this.holdGlobalsService.removePerson(this.id);

  }


}






