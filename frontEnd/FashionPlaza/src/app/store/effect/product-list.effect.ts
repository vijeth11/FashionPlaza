import { LoadProductFailureAction } from './../actions/product.action';
import { LoadProductListSuccessAction, ProductListActionType } from './../actions/product-list.action';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadProductListAction } from '../actions/product-list.action';
import { mergeMap , map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FassionPlazaService } from 'src/app/fassionplaza.service';

@Injectable()
export class ProductListEffects{

    @Effect() loadProductList$ = this.action$.pipe(
        ofType<LoadProductListAction>(ProductListActionType.LOAD_PRODUCT_LIST),
        mergeMap((clothType) => this.productListService.getProductListItems(clothType.payload).
            pipe(
                map((data:any) => new LoadProductListSuccessAction(data)),
                catchError(error => of(new LoadProductFailureAction(error)))
            )
        )
    )

    constructor(private action$:Actions, private productListService:FassionPlazaService){

    }
}

