import { LoadCartListAction } from './../../store/actions/cart.action';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { AppState } from 'src/app/store/model/app-state.models';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class UserProductsListResolver implements Resolve<any>{

    constructor(private store:Store<AppState>){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.store.dispatch(new LoadCartListAction());  
        // resolvers should retun an observable with some value
        return of('NONE');
    }
}