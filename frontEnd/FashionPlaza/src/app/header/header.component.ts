import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category:any;
  constructor() { 
    this.category={"women":["Shoes","Jewelry","Tops"],"men":["Shirts","Knits","Bottom"]};
  }

  ngOnInit() {
  }

}
