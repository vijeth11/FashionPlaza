import { Product } from './../model/product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductState extends EntityState<Product>{
    loading:boolean, //Extra Parameters
    error:Error
}

export const productAdapter:EntityAdapter<Product> = createEntityAdapter<Product>();