import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticationService{
    private is_user_authenticated:boolean = false;
    private authToken:string="";

    constructor(private http: HttpClient){}
    
    public isAuthenticated(){
        return this.is_user_authenticated;
    }

    public login(username:string,password:string){
        this.is_user_authenticated = true;
        //this.http.post<any>();
    } 
}