import { Action } from "@ngrx/store";
import { ProductList } from "../model/product-list.model";

export enum ProductListActionType{
    LOAD_PRODUCT_LIST = '[PRODUCTLIST] Load Product',
    LOAD_PRODUCT_LIST_SUCCESS = '[PRODUCTLIST] Load Product Success',
    LOAD_PRODUCT_LIST_FAILURE = '[PRODUCTLIST] Load Product Failure',
}

export class LoadProductListAction implements Action{
    readonly type = ProductListActionType.LOAD_PRODUCT_LIST
    constructor(public payload:{type:string, category:string}){}
}

export class LoadProductListSuccessAction implements Action{
    readonly type = ProductListActionType.LOAD_PRODUCT_LIST_SUCCESS
    constructor(public payload:Array<ProductList>){}
}

export class LoadProductListFailureAction implements Action{
    readonly type = ProductListActionType.LOAD_PRODUCT_LIST_FAILURE
    constructor(public payload:Error){}
}

export type ProductListAction = LoadProductListAction
| LoadProductListSuccessAction
| LoadProductListFailureAction;