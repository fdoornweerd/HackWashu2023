import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { languages } from '../languages';
import { interests } from '../interests';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  userId: string | null = null;
  languageOptions: string[] = languages;
  interestOptions: string[] = interests;

  profileEditForm = new FormGroup({
    email: new FormControl(),
    age: new FormControl(''),
    proficientLanguages: new FormControl([]),
    learningLanguages: new FormControl([]),
    interests: new FormControl([])
  });

  selectedProficientLanguages: string[] = [];
  selectedLearningLanguages: string[] = [];
  selectedInterests: string[] = [];
  showProficientDropdown = false;
  showLearningDropdown = false;
  showInterestDropdown = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.token$.subscribe((token) => {
      if (token) {
        const decodedToken = this.authService.getDecodedToken(token);
        this.userId = decodedToken.userId;
      } else {
        this.userId = null;
      }
    });
  }

  toggleProficientDropdown() {
    this.showProficientDropdown = !this.showProficientDropdown;
  }

  toggleLearningDropdown() {
    this.showLearningDropdown = !this.showLearningDropdown;
  }

  toggleInterestDropdown() {
    this.showInterestDropdown = !this.showInterestDropdown;
  }

  addProficientLanguage(language: string) {
    if (!this.selectedProficientLanguages.includes(language)) {
      this.selectedProficientLanguages.push(language);
    }
  }

  removeProficientLanguage(language: string) {
    const index = this.selectedProficientLanguages.indexOf(language);
    if (index !== -1) {
      this.selectedProficientLanguages.splice(index, 1);
    }
  }

  addLearningLanguage(language: string) {
    if (!this.selectedLearningLanguages.includes(language)) {
      this.selectedLearningLanguages.push(language);
    }
  }

  removeLearningLanguage(language: string) {
    const index = this.selectedLearningLanguages.indexOf(language);
    if (index !== -1) {
      this.selectedLearningLanguages.splice(index, 1);
    }
  }

  addInterest(interest: string) {
    if (!this.selectedInterests.includes(interest)) {
      this.selectedInterests.push(interest);
    }
  }

  removeInterest(interest: string) {
    const index = this.selectedInterests.indexOf(interest);
    if (index !== -1) {
      this.selectedInterests.splice(index, 1);
    }
  }

  editProfile() {
    console.log('Editing profile');
    const userData = {
      user_id: this.userId,
      email: this.profileEditForm.value.email,
      age: this.profileEditForm.value.age,
      proficientLanguages: this.selectedProficientLanguages,
      learningLanguages: this.selectedLearningLanguages,
      interests: this.selectedInterests
    };
    console.log(userData);

    
  }

  
}
