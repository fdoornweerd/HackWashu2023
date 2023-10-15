import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
/*import OpenAI from 'openai';
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";


const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config);


const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
});

*/

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

}
