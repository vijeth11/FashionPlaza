import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { mergeMap } from "rxjs/operators";
import { FassionPlazaService } from "src/app/shared/services/fassionplaza.service";

@Injectable()
export class UserCartEffects{
    @Effect() loadUserCart$ = this.action$.pipe(
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