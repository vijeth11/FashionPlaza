import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { FassionPlazaService } from "src/app/shared/services/fassionplaza.service";
import { AddOrUpdateCartItemsAction, CartActionType, LoadCartListAction, LoadCartListFailureAction, LoadCartListSuccessAction } from "../actions/cart.action";

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

    @Effect() addToCart$ = this.action$.pipe(
        ofType<AddOrUpdateCartItemsAction>(CartActionType.ADD_OR_UPDATE_CART_ITEMS),
        mergeMap((data) => this.cartListService.addOrUpdateCartItemsToDatabase(data.payload)
            .pipe(
                map(() => new LoadCartListAction())
            )
        )
    )

    constructor(private action$:Actions, private cartListService:FassionPlazaService){

    }
}
