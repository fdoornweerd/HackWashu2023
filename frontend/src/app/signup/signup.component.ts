import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registrationForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }


  registerUser() {
    console.log('Registering user');
    const userData = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
      // Add other user registration data fields
    };
    console.log(userData);

    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.router.navigate(['/profilesetup']);
        // Handle success, e.g., navigate to a different page or display a success message
      },
      error: (error) => {
        console.error('User registration failed', error);
        // Handle error, e.g., display an error message to the user
      }
    });
  }
}
