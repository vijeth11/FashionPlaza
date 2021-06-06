import { Action } from "@ngrx/store";
import { Product } from "../model/product.model";

export enum ProductActionTypes {
    LOAD_PRODUCT = '[PRODUCT] Load Product',
    LOAD_PRODUCT_SUCCESS = '[PRODUCT] Load Product Success',
    LOAD_PRODUCT_FAILURE = '[PRODUCT] Load Product Failure',
}

export class LoadProductAction implements Action{
    readonly type = ProductActionTypes.LOAD_PRODUCT
    constructor(public payload:number){}
}

export class LoadProductSuccessAction implements Action{
    readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS
    constructor(public payload: Product){}
}

export class LoadProductFailureAction implements Action{
    readonly type = ProductActionTypes.LOAD_PRODUCT_FAILURE
    constructor(public payload: Error){}
}

export type ProductAction = LoadProductAction
| LoadProductSuccessAction
| LoadProductFailureAction