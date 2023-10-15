import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatResponseComponent } from '../chat-response/chat-response.component';
import OpenAI from 'openai';

// import { Configuration, OpenAIApi } from "openai-edge";
// import { OpenAIStream, StreamingTextResponse } from "ai";

//require('dotenv').config();
//const apiKey = process.env['OPEN_AI_API'];

const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});


export async function POST(request: string) {

  //front of your array


  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
});


  console.log(chatCompletion);


  const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
          { role: "system", content: "you only speak in spanish"},
          { role: "user", content: "say hello"}
      ]
  });



 // const stream = await OpenAIStream(response);


  // send the stream as a response to our client / frontend
  //return response
  //new StreamingTextResponse(stream);
}






@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule,ChatResponseComponent],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  request: string = '';
  inputValue: string = '';
  currInputValue: string = '';
  previousResponses: string[] = ['Bot: Hello! What language would you like to talk in?'];

  constructor() {}

  ngOnInit() {

    this.callPostFunction();
  }

  getInfo(){
    this.currInputValue = this.inputValue;
    this.previousResponses.unshift('You: '+this.currInputValue);
    this.inputValue = '';
  }

  async callPostFunction() {
    try {
      

      const request = "write me a haiku";

      console.log('Request:',request)

    
      const response = await POST(request); //CHANGE THIS LINE

  
      console.log('Response:', response);
      
    } catch (error) {
      console.error('Error:', error);
      
    }
  }


}
