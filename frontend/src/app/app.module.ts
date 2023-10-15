import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { PeopleContainerComponent } from './people-container/people-container.component';
import { SignupComponent } from './signup/signup.component';
import { MatchesComponent } from './matches/matches.component';
import { AiChatComponent } from './ai-chat/ai-chat.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent],
  imports: [ MatchesComponent,SignupComponent,SigninComponent, PeopleContainerComponent, SignupComponent, MatchesComponent, AiChatComponent, SigninComponent, BrowserModule, FormsModule, AppRoutingModule, HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),],
  
  bootstrap: [AppComponent]
})
export class AppModule {


  


 }
