import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../Person';

@Component({
  selector: 'app-view-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.scss']
})
export class ViewPersonComponent {

  contact: boolean = false;

  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  proficient: string[] = [];
  learning: string[] = [];
  interests: string[] = [];
  blurb: string = '';
  bio: string = '';
  id: number = 0;
  email: string = '';
  phone: string = '';





  person: Person = {
    firstName: 'Sylvia',
    lastName: 'Kozub',
    age: 20,
    proficient: ['English',' Polish'],
    learning: ['Spanish'],
    interests: ['Programming',' Cricket',' Golf'],
    blurb: 'Love learning CS and meeting new people!',
    bio: "My name is Sylvia Kozub, and I'm a 20-year-old with an insatiable curiosity and an unending enthusiasm for life. I come from a diverse linguistic background, which has allowed me to become proficient in both English and Polish. This love for languages has been a gateway to understanding and connecting with people from all walks of life. Currently, I'm on a journey to master Spanish, broadening my horizons and embracing the rich tapestry of the Spanish-speaking world. One of my greatest passions in life is programming. To me, it's not just a subject of study; it's an integral part of who I am. I find immense joy in deciphering the intricate codes of the digital world. The endless possibilities that technology offers excite me, and I'm always on the lookout for new challenges and innovations in the ever-evolving tech landscape. While I'm deeply immersed in the world of coding, I also have a surprising love for sports. Cricket and golf might seem like an unusual combination, but they reflect my versatility. Cricket, with its strategic complexities, piques my interest, and I enjoy watching and playing the sport whenever I can. On the other hand, golf offers me tranquility and a chance to connect with nature on the lush greens of the course.",
    email: 'sylviakozub@gmail.com',
    number: '708-439-5595',
    id: 10
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let contactRouter;
    let id;
    this.route.paramMap.subscribe(params => {
      id = params.get('id');
      contactRouter = params.get('contact');
      //TODO: DOV USE ID TO GET USER FROM DB TO DISPLAY

    });

    if(contactRouter == 'true') {
      this.contact = true;
    }

    this.firstName = this.person.firstName; 
    this.lastName = this.person.lastName; 
    this.age = this.person.age;
    this.proficient = this.person.proficient;
    this.learning = this.person.learning;
    this.interests = this.person.interests;
    this.blurb = this.person.blurb;
    this.bio = this.person.bio;
    this.id = this.person.id;
    this.email = this.person.email;
    this.phone = this.person.number;





  }

  call(){

    const phoneNumber = '+1'+this.phone;
    window.location.href = 'tel:' + phoneNumber;


  }

  facetime(){
    const facetimeURL = 'facetime://'+this.phone; 
    window.open(facetimeURL);
  }


  accept(){

  }

  reject(){


  }




}
