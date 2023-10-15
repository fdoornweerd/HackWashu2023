import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatResponseComponent } from '../chat-response/chat-response.component';
import { OpenaiService } from '../openai.service';
import { Message } from '../Message';
import { languages } from '../languages';


@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatResponseComponent],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})



export class ChatPageComponent {

  languages: string[] = languages.map((language) => language.toLowerCase());
  foundLanguage: boolean = false;
  placeholder: string = 'Type which language you would like to talk in...';
  request: string = '';
  inputValue: string = '';
  currInputValue: string = '';
  previousResponses: string[] = ['Bot: Hello! What language would you like to talk in?'];
  messages: Message[] = [];


  constructor(private openaiService: OpenaiService) {}


  async getInfo() {


    if(this.foundLanguage) {

      this.currInputValue = this.inputValue;
      this.inputValue = '';
      this.previousResponses.unshift('You: ' + this.currInputValue);
      let responseBack = '';
  
      try {
        console.log(this.messages);
        this.messages.push({ role: "user", content: this.currInputValue });
  
        const response = await this.openaiService.getOpenAIResponse(this.messages).subscribe((response) => {
          responseBack = response.choices[0].message.content;
          this.previousResponses.unshift('Bot: ' + responseBack);
          this.messages.push({ role: "assistant", content: responseBack });
        });
  
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      
      if(this.languages.indexOf(this.inputValue.toLowerCase()) !== -1) {
        this.foundLanguage = true;
        this.placeholder = 'Type here...';
        this.messages.push({ role: "system", content: "you only speak in "+this.inputValue });
        this.messages.push({ role: "assistant", content: "start asking me questions about myself"});

        this.previousResponses.unshift('You: ' + this.inputValue);

        this.inputValue = '';

        let responseBack = '';
        const response = await this.openaiService.getOpenAIResponse(this.messages).subscribe((response) => {
          responseBack = response.choices[0].message.content;
          this.previousResponses.unshift('Bot: ' + responseBack);
          this.messages.push({ role: "assistant", content: responseBack });
        });
        
      } else {
        this.inputValue = '';
        this.placeholder = 'Please enter a valid language...';
      }
    }


  }




}
