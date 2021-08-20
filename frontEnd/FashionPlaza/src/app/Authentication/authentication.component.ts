import { ActivatedRoute, Router } from '@angular/router';
import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { AuthenticationService } from "../shared/services/Authentication.service";
@Component({
    selector:'app-authentication',
    templateUrl:'./authentication.component.html',
    styleUrls:['./authentication.component.css']
})
export class AuthenticationComponent {

    private returnUrl:string;
    constructor(
        private activatedRoute:ActivatedRoute,
        private route: Router, 
        private authService:AuthenticationService){
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }

    goBack(){
        // authenticate and route it back to previous URL
        this.authService.login("test","test");
        this.route.navigateByUrl(this.returnUrl);
    }
}