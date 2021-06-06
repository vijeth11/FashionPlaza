import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutUsImage:string = environment.imageUrl +"aboutus.jpg";
  constructor() { }

  ngOnInit() {
  }

}
