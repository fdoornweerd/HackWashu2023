import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './Message';
@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = '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'; // Replace with your API key
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace with the OpenAI API endpoint
  
  // 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions'
  constructor(private http: HttpClient) {}

  // Define a method to make requests to the OpenAI API
  getOpenAIResponse(prompts: Message[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const data = {
      model: 'gpt-3.5-turbo',
      messages: prompts,
    };

    return this.http.post(this.apiUrl, data, { headers });
  }
}
