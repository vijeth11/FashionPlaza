import { FassionPlazaService } from '../../shared/services/fassionplaza.service';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap} from "rxjs/operators";
import { LoadProductAction, LoadProductFailureAction, LoadProductSuccessAction, ProductActionTypes } from "../actions/product.action";
import { of } from 'rxjs';

@Injectable()
export class ProductEffects{

    @Effect() loadProductList$ = this.action$.pipe(
        ofType<LoadProductAction>(ProductActionTypes.LOAD_PRODUCT),
        mergeMap((ProductId) => this.productListService.getProductDetails(ProductId).
            pipe(
                map((data:any) => new LoadProductSuccessAction(data)),
                catchError(error => of(new LoadProductFailureAction(error)))
            )
        )
    )

    constructor(private action$:Actions, private productListService:FassionPlazaService){

    }
}