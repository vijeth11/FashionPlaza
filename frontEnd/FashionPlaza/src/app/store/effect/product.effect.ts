import { FassionPlazaService } from '../../shared/services/fassionplaza.service';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap} from "rxjs/operators";
import { LoadProductAction, LoadProductFailureAction, LoadProductSuccessAction, ProductActionTypes } from "../actions/product.action";
import { of } from 'rxjs';

@Injectable()
export class ProductEffects{

    @Effect() loadProduct$ = this.action$.pipe(
        ofType<LoadProductAction>(ProductActionTypes.LOAD_PRODUCT),
        mergeMap((parameters) => this.productListService.getProductDetails(parameters.payload).
            pipe(
                map((data:any) => {
                    let {Size, ...finalData}:any = {...data, sizes:data.Size.split(",")};
                    return new LoadProductSuccessAction(finalData);
                }),
                catchError(error => of(new LoadProductFailureAction(error)))
            )
        )
    )

    constructor(private action$:Actions, private productListService:FassionPlazaService){

    }
}