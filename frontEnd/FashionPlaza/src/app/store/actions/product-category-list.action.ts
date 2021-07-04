import { Action } from "@ngrx/store";

export enum ProductCategoryListActionType{
    LOAD_PRODUCT_LIST = '[PRODUCTCATEGORYLIST] Load Category Product',
    LOAD_PRODUCT_LIST_SUCCESS = '[PRODUCTCATEGORYLIST] Load Category Product Success',
    LOAD_PRODUCT_LIST_FAILURE = '[PRODUCTCATEGORYLIST] Load Category Product Failure',
}

export class LoadProductCategoryListAction implements Action{
    readonly type = ProductCategoryListActionType.LOAD_PRODUCT_LIST
    constructor(){}
}

export class LoadProductCategoryListSuccessAction implements Action{
    readonly type = ProductCategoryListActionType.LOAD_PRODUCT_LIST_SUCCESS
    constructor(public payload:Array<{Type:string, Subtype:string}>){}
}

export class LoadProductCategoryListFailureAction implements Action{
    readonly type = ProductCategoryListActionType.LOAD_PRODUCT_LIST_FAILURE
    constructor(public payload:Error){}
}

export type ProductCategoryListAction = LoadProductCategoryListAction
| LoadProductCategoryListSuccessAction
| LoadProductCategoryListFailureAction;