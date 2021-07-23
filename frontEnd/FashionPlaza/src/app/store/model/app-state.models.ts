import { ProductState } from './../entity/product-entity';
import { ProductListState } from './../entity/product-list-entity';

export interface AppState{
    productList:ProductListState;
    product:ProductState;
    categories:{Type:string,Subtype:string, Loading:boolean, Error:Error}[];
}