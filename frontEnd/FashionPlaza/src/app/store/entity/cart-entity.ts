import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Cart } from "../model/cart.model";

export interface CartState extends EntityState<Cart>{
    loading:boolean, //Extra Parameters
    error:Error
}

export const cartAdapter:EntityAdapter<Cart> = createEntityAdapter<Cart>({selectId:selectByProductId});

// custom id parameter which is required by entity
export function selectByProductId(cart:Cart):number{
    return cart.productId;
}