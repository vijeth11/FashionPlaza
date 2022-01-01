import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { FassionPlazaService } from "src/app/shared/services/fassionplaza.service";
import { CartActionType, LoadCartListAction, LoadCartListFailureAction, LoadCartListSuccessAction } from "../actions/cart.action";import { LoadProductFailureAction } from "../actions/product.action";

@Injectable()
export class CartListEffects{

    @Effect() loadCartList$ = this.action$.pipe(
        ofType<LoadCartListAction>(CartActionType.LOAD_CART_LIST),
        mergeMap(() => this.cartListService.getCartListItems().
            pipe(
                map((data:any) => new LoadCartListSuccessAction(data)),
                catchError(error => of(new LoadCartListFailureAction(error)))
            )
        )
    )

    constructor(private action$:Actions, private cartListService:FassionPlazaService){

    }
}
