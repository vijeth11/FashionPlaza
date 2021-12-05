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

    goBack(email,password){
        // authenticate and route it back to previous URL
        this.authService.login(email,password).subscribe( data => {
            this.route.navigateByUrl(this.returnUrl);
        },
        error => {
            console.log(error);
        });        
    }

    createUser(firstname,lastname,email,phonenumber,password1,password2,){
        let new_user_data={FirstName:firstname,LastName:lastname,Email:email,PhoneNumber:phonenumber,password:password1,password2:password2};
        this.authService.createCustomerUser(new_user_data)
        .subscribe(
            data => this.route.navigateByUrl('/login/existing'),
            error=> console.log(error)
        )
    }
}