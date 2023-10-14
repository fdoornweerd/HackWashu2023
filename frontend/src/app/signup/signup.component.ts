import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.registerUser();
  }

  registerUser() {
    const userData = {
      email: this.email,
      password: this.password,
      username: this.name,
      // Add other user registration data fields
    };

    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        // Handle success, e.g., navigate to a different page or display a success message
      },
      error: (error) => {
        console.error('User registration failed', error);
        // Handle error, e.g., display an error message to the user
      }
    });
  }
}
