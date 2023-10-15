import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule, RouterModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() age: number = 0;
  @Input() proficient: string[] = [];
  @Input() learning: string[] = [];
  @Input() intrests: string[] = [];
  @Input() blurb: string = '';
  @Input() id: number = 0;
  contact: boolean = true;
}
