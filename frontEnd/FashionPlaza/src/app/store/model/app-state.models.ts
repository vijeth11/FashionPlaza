import { ProductState } from './../entity/product-entity';
import { ProductListState } from './../entity/product-list-entity';

export interface AppState{
    readonly productList:ProductListState;
    readonly product:ProductState;
    readonly categories:{Type:string,Subtype:string, Loading:boolean, Error:Error}[];
}