import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Replace with your home component
import { SigninComponent } from './signin/signin.component'; // Replace with your sign-in component
import { HubComponent } from './hub/hub.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilesetupComponent } from './profilesetup/profilesetup.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { EditprofileComponent } from './editprofile/editprofile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'hub', component: HubComponent},
  { path: 'profilesetup', component: ProfilesetupComponent},
  { path: 'editprofile', component: EditprofileComponent},
  { path: 'chatpage', component: ChatPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
