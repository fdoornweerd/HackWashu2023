import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { languages } from '../languages';
import { interests } from '../interests';


@Component({
  selector: 'app-profilesetup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class ProfilesetupComponent implements OnInit{
  userId: string | null = null;


  languageOptions: string[] = languages;
  interestOptions: string[] = interests;

  profileSetupForm = new FormGroup({
    email: new FormControl(''),
    age: new FormControl(''),
    proficientLanguages: new FormControl([]), // Capture selected proficient languages
    learningLanguages: new FormControl([]),   // Capture selected learning languages
    interests: new FormControl([])           // Capture selected interests
});



  selectedProficientLanguages: string[] = [];
  selectedLearningLanguages: string[] = [];
  selectedInterests: string[] = [];
  showProficientDropdown = false;
  showLearningDropdown = false;
  showInterestDropdown = false;

  constructor(private authService: AuthService, private router: Router) { }

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
  }


  toggleProficientDropdown() {
      
      this.showProficientDropdown = !this.showProficientDropdown;
      console.log(this.showProficientDropdown);
  }
  toggleLearningDropdown() {
      
    this.showLearningDropdown = !this.showLearningDropdown;
    console.log(this.showLearningDropdown);
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

  profileSetup() {
    console.log('Setting up profile');
    const userData = {
      user_id: this.userId,
      email: this.profileSetupForm.value.email,
      age: this.profileSetupForm.value.age,
      proficientLanguages: this.selectedProficientLanguages,
      learningLanguages: this.selectedLearningLanguages,
      interests: this.selectedInterests
    };
    console.log(userData);

    this.authService.profileSetup(userData).subscribe({
      next: (response) => {
        console.log('Profile set up successfully', response);
        this.router.navigate(['/hub']);
        // Handle success, e.g., navigate to a different page or display a success message
      },
      error: (error) => {
        console.error('Profile set up failed', error);
        // Handle error, e.g., display an error message to the user
      }
    });
  }
}

