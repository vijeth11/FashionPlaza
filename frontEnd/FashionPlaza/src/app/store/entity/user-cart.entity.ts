import { Cart } from './../model/cart.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface CartState extends EntityState<Cart>{
    loading:boolean, //Extra Parameters
    error:Error
}

export const cartAdapter:EntityAdapter<Cart> = createEntityAdapter<Cart>();