import { Component } from '@angular/core';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { NgFor } from '@angular/common';
import { Person } from '../Person';

@Component({
  selector: 'app-recommend-container',
  standalone: true,
  imports: [RecommendationsComponent,NgFor],
  templateUrl: './recommend-container.component.html',
  styleUrls: ['./recommend-container.component.scss']
})





export class RecommendContainerComponent {
  people: Person[] = [];

  constructor() {

    const person1: Person = {
      firstName: 'Sylvia',
      lastName: 'Kozub',
      age: 20,
      proficient: ['English',' Polish'],
      learning: ['Spanish'],
      interests: ['Programming',' Cricket',' Golf'],
      blurb: 'Love learning CS and meeting new people!',
      bio: "My name is Sylvia Kozub, and I'm a 20-year-old with an insatiable curiosity and an unending enthusiasm for life. I come from a diverse linguistic background, which has allowed me to become proficient in both English and Polish. This love for languages has been a gateway to understanding and connecting with people from all walks of life. Currently, I'm on a journey to master Spanish, broadening my horizons and embracing the rich tapestry of the Spanish-speaking world. One of my greatest passions in life is programming. To me, it's not just a subject of study; it's an integral part of who I am. I find immense joy in deciphering the intricate codes of the digital world. The endless possibilities that technology offers excite me, and I'm always on the lookout for new challenges and innovations in the ever-evolving tech landscape. While I'm deeply immersed in the world of coding, I also have a surprising love for sports. Cricket and golf might seem like an unusual combination, but they reflect my versatility. Cricket, with its strategic complexities, piques my interest, and I enjoy watching and playing the sport whenever I can. On the other hand, golf offers me tranquility and a chance to connect with nature on the lush greens of the course.",
      email: 'sylviakozub@gmail.com',
      number: '123-456-7890',
      id: 10
    };

    const person2: Person = {
      firstName: 'Finn',
      lastName: 'Doornweerd',
      age: 20,
      proficient: ['English'],
      learning: ['Italian'],
      interests: ['Soccer',' Sewing',' Lifting'],
      blurb: 'I am trying to get closer to my Italian heritage by learning Italian!',
      bio: "I'm Finn Doornweerd, a 20-year-old on an exhilarating journey of self-discovery and cultural exploration. Proficient in English, I have embarked on a mission to connect with my Italian heritage by immersing myself in the melodious world of the Italian language. This pursuit is more than just a linguistic challenge; it's a heartfelt endeavor to bridge the gap between generations and embrace the traditions and stories of my Italian ancestors. As I navigate the intricacies of this beautiful language, I find myself not only learning words but also unraveling the rich tapestry of a culture that has been a part of my family's history for generations. Beyond my linguistic aspirations, I am a passionate enthusiast of the beautiful game, soccer. The way a soccer ball dances across the pitch, connecting with players in a universal language, mirrors the spirit of connection that I seek in my cultural exploration. Whether it's watching a thrilling match or kicking the ball around with friends, soccer is more than just a sport; it's a conduit for shared experiences and unforgettable moments. Sewing, on the other hand, provides me with a canvas for creativity and self-expression. It's a remarkable journey into the world of fabric and design, where each stitch is a testament to patience and precision. The art of sewing allows me to take the thoughts and ideas that swirl in my mind and transform them into tangible creations, whether it's a piece of clothing, a stylish accessory, or a unique home decor item. Additionally, I find my solace and strength in the world of weightlifting. Lifting weights is not merely about physical strength; it's about discipline, determination, and pushing the boundaries of what I thought was possible. It's a journey of self-discovery and resilience, where every repetition brings me closer to my personal goals and builds a mindset of determination that extends beyond the weight room.",
      email: 'finnyfoo@gmail.com',
      number: '666-666-6662',
      id: 11
    };

    
    this.people.push(person1);
    this.people.push(person2);

    
  }
  removeRecommendation(person: Person) {
    // Find the index of the person in the array
    const index = this.people.indexOf(person);

    // If the person is found in the array, remove them
    if (index !== -1) {
      this.people.splice(index, 1);
    }
  }


}


