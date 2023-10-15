import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './Message';
@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = '';
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; 
  
 
  constructor(private http: HttpClient) {}


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
