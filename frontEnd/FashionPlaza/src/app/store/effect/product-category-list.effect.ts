import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { FassionPlazaService } from "src/app/shared/services/fassionplaza.service";
import { LoadProductCategoryListAction, LoadProductCategoryListFailureAction, LoadProductCategoryListSuccessAction, ProductCategoryListActionType } from "../actions/product-category-list.action";

@Injectable()
export class ProductCategoryListEffects{

    @Effect() loadProductCategoryList$ = this.action$.pipe(
        ofType<LoadProductCategoryListAction>(ProductCategoryListActionType.LOAD_PRODUCT_LIST),
        mergeMap(() => this.productListService.getProductCategoryList().
            pipe(
                map((data:any) => new LoadProductCategoryListSuccessAction(data)),
                catchError(error => of(new LoadProductCategoryListFailureAction(error)))
            )
        )
    )

    constructor(private action$:Actions, private productListService:FassionPlazaService){

    }
}
