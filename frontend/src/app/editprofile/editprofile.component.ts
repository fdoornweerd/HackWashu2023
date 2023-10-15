import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { languages } from '../languages';
import { interests } from '../interests';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { tap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';



@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  userId: string | null = null;
  languageOptions: string[] = languages;
  interestOptions: string[] = interests;
  nothing: any[] = [];

  id: number = 0;
  firstName: string = '';
  lastName: string =  '';
  age: number = 0;
  proficient: string[] = [];
  learning: string[] = [];
  interests: string[] = [];
  blurb: string =  '';
  bio: string =  '';
  number: string =  '';
  email:string =  '';

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

  //constructor(private authService: AuthService, private router: Router) {}
  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.getUserInfoForPlaceholder()
    this.selectedProficientLanguages = this.proficient;
    this.selectedLearningLanguages = this.learning;
    this.selectedInterests = this.interests;


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

  getUserInfoForPlaceholder() {

    this.firstName = 'Finn';
    this.lastName = 'Doornweerd';
    this.age = 20;
    this.proficient = ['English'];
    this.learning = ['Italian'];
    this.interests= ['Soccer',' Sewing',' Lifting'];
    this.blurb= 'I am trying to get closer to my Italian heritage by learning Italian!';
    this.bio= "I'm Finn Doornweerd, a 20-year-old on an exhilarating journey of self-discovery and cultural exploration. Proficient in English, I have embarked on a mission to connect with my Italian heritage by immersing myself in the melodious world of the Italian language. This pursuit is more than just a linguistic challenge; it's a heartfelt endeavor to bridge the gap between generations and embrace the traditions and stories of my Italian ancestors. As I navigate the intricacies of this beautiful language, I find myself not only learning words but also unraveling the rich tapestry of a culture that has been a part of my family's history for generations. Beyond my linguistic aspirations, I am a passionate enthusiast of the beautiful game, soccer. The way a soccer ball dances across the pitch, connecting with players in a universal language, mirrors the spirit of connection that I seek in my cultural exploration. Whether it's watching a thrilling match or kicking the ball around with friends, soccer is more than just a sport; it's a conduit for shared experiences and unforgettable moments. Sewing, on the other hand, provides me with a canvas for creativity and self-expression. It's a remarkable journey into the world of fabric and design, where each stitch is a testament to patience and precision. The art of sewing allows me to take the thoughts and ideas that swirl in my mind and transform them into tangible creations, whether it's a piece of clothing, a stylish accessory, or a unique home decor item. Additionally, I find my solace and strength in the world of weightlifting. Lifting weights is not merely about physical strength; it's about discipline, determination, and pushing the boundaries of what I thought was possible. It's a journey of self-discovery and resilience, where every repetition brings me closer to my personal goals and builds a mindset of determination that extends beyond the weight room.";
    this.email= 'finnyfoo@gmail.com';
    this.number= '666-666-6662';
    this.id= 11;

    //USE THIS ONCE DB IS WORKING TO SET VALUES
    /*
    if (this.nothing && this.nothing.length > 0) {
      const userInfoObservables = this.nothing.map((userId) =>
        this.userService.getUserInfo(userId).pipe(
          tap((response: any) => {
            console.log('User info retrieved for user ID:', userId, response);
          })
        )
      );
      return forkJoin(userInfoObservables);
    } else {
      return of([]);
    }
    */
  }

  updateInfo(){
    //ADD TO UPDATE INFO W DATABASE
  }

  
}
