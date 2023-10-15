import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    console.log('Signing in user');
    const userData = {
      username: this.signInForm.value.username,
      password: this.signInForm.value.password
    };
    console.log(userData);

    this.authService.signInUser(userData).subscribe({
      next: (response) => {
        console.log('User signed in successfully', response);
        this.router.navigate(['/hub']);
        // Handle success, e.g., navigate to a different page or display a success message
      },
      error: (error) => {
        console.error('User sign in failed', error);
        // Handle error, e.g., display an error message to the user
      }
    });
  }

}
