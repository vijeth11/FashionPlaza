import { LoadProductListAction } from './../../store/actions/product-list.action';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/model/app-state.models';


@Injectable()
export class LoadClothListResolver implements Resolve<any>{
    constructor(private store:Store<AppState>){
        
    }

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        if(route.data){
            this.store.dispatch(new route.data.type({}));
        }
        return of('NONE');
    }
}