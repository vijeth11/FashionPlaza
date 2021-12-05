import { Router } from '@angular/router';
import { AuthenticationService } from './../shared/services/Authentication.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category:any = {};
  @Input() set categories(data){
    this.category["women"] = [];
    this.category["men"] = [];
    for(let item of data){
      if(item.Type.toLowerCase() === "women"){
        this.category["women"].push(item.Subtype[0].toUpperCase()+item.Subtype.slice(1,item.Subtype.length))
      }
      if(item.Type.toLowerCase() === "men"){
        this.category["men"].push(item.Subtype[0].toUpperCase()+item.Subtype.slice(1,item.Subtype.length))
      }
    }
  }
  constructor(private authenticationService:AuthenticationService,private router:Router) { 
    //this.category={"women":["Shoes","Jewelry","Tops"],"men":["Shirts","Knits","Bottom"]};
    
  }

  ngOnInit() {
  }

  showLogout(){
    return this.authenticationService.isAuthenticated();
  }

  logOut(){
    this.authenticationService.logOut().subscribe(
      data => {
        this.router.navigate(["home"]);
      },
      error=>console.log(error)      
    );
  }
}
