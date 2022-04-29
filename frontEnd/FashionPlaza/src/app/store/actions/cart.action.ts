import { Action } from "@ngrx/store";
import { Cart } from "../model/cart.model";

export enum CartActionType{
    LOAD_CART_LIST = '[CARTLIST] Load Cart',
    LOAD_CART_LIST_SUCCESS = '[CARTLIST] Load Cart Success',
    LOAD_CART_LIST_FAILURE = '[CARTLIST] Load Cart Failure',
    ADD_OR_UPDATE_CART_ITEMS = '[CARTLIST] Add or Update Cart Items',
}

export class LoadCartListAction implements Action{
    readonly type = CartActionType.LOAD_CART_LIST
    constructor(){}
}

export class LoadCartListSuccessAction implements Action{
    readonly type = CartActionType.LOAD_CART_LIST_SUCCESS
    constructor(public payload:Array<Cart>){}
}

export class LoadCartListFailureAction implements Action{
    readonly type = CartActionType.LOAD_CART_LIST_FAILURE
    constructor(public payload:Error){}
}

export class AddOrUpdateCartItemsAction implements Action{
    
    readonly type = CartActionType.ADD_OR_UPDATE_CART_ITEMS
    constructor(public payload:Cart[]){}
}

export type CartListAction = LoadCartListAction
| LoadCartListSuccessAction
| LoadCartListFailureAction
| AddOrUpdateCartItemsAction;