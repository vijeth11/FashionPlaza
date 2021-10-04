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
    public formType:string;
    public headerName:string="Login";
    constructor(
        private activatedRoute:ActivatedRoute,
        private route: Router, 
        private authService:AuthenticationService){
        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
        this.activatedRoute.params.subscribe(data => {
            this.formType = data['type'];
            this.headerName = this.formType.toLowerCase() == "new" ? "Create Account" : "Login";
        });        
    }

    goBack(){
        // authenticate and route it back to previous URL
        this.authService.login("test","test");
        this.route.navigateByUrl(this.returnUrl);
    }
}