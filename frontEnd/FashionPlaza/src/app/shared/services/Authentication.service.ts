import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";

@Injectable()
export class AuthenticationService {
  private is_user_authenticated: boolean = false;
  private authToken: string = "";
  private PRODUCT_URL = environment.production
    ? "/api/"
    : "http://localhost:8000/api/";

  constructor(private http: HttpClient) {}

  public isAuthenticated() {
    return this.is_user_authenticated;
  }

  public login(username: string, password: string): Observable<any> {
    let authorizationData = "Basic " + btoa(username + ":" + password);
    let url = this.PRODUCT_URL + "login/";
    return this.http
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationData,
        },
      })
      .pipe(
        map((data) => {
          // json data
          this.authToken = data["token"];
          this.is_user_authenticated = true;
          return data;
        }),
        catchError((error) => {
          console.log("Error: ", error);
          this.authToken = null;
          this.is_user_authenticated = false;
          return throwError(error);
        })
      );
  }

  public logOut(): Observable<any> {
    let url = this.PRODUCT_URL + "customer/login/logout/";
    return this.http.get(url, {
      headers: {
        Authorization: `Token ${this.authToken}`,
      },
    }).pipe(tap(() => {
        this.is_user_authenticated = false;
        this.authToken = null;
    }));
  }

  public createCustomerUser(data) {
    let url = this.PRODUCT_URL + "customer/";
    return this.http.post<any>(url, data ,{headers:{
        'Content-Type':'application/json'
    }});
  }
}
