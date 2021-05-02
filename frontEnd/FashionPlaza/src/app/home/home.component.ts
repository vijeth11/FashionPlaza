import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  marketContent:{type:string,message:string,image:string}[]= [
    {
      type:"women",
      message:"Up to 25% off women jackets!",
      image:"women.jpg"
    },
    {
      type:"men",
      message:"New shirt collection for men",
      image:"men.jpg"
    }
  ];
  constructor(private el:ElementRef) { }

  ngOnInit() {
  }

  tabbutton(event,id){
    let tablinks = this.el.nativeElement.querySelectorAll(".tablinks");
    for(let link of tablinks){
      link.classList.remove("active");
    }
    event.target.classList.add("active");
    let tabcontents = this.el.nativeElement.querySelectorAll(".tabcontent");
    for(let content of tabcontents){
      content.classList.remove("active");
    }
    this.el.nativeElement.querySelector("#"+id).classList.add('active');
  }
}
