import { ProductList } from './../model/product-list.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductListState extends EntityState<ProductList>{
    loading:boolean, //Extra Parameters
    error:Error,
}

export const productListAdapter:EntityAdapter<ProductList> = createEntityAdapter<ProductList>();