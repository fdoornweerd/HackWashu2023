import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Replace with your home component
import { SigninComponent } from './signin/signin.component'; // Replace with your sign-in component
<<<<<<< HEAD
=======
import { HubComponent } from './hub/hub.component';
import { SignupComponent } from './signup/signup.component';
>>>>>>> 0403ab940074c264f0d31fa4f888c7d5557bd8f5


const routes: Routes = [
  { path: '', component: HomeComponent },
<<<<<<< HEAD
  { path: 'signin', component: SigninComponent }
=======
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hub', component: HubComponent}
>>>>>>> 0403ab940074c264f0d31fa4f888c7d5557bd8f5
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
