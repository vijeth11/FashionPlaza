import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { AppState } from "../model/app-state.models";
import { CartListReducer } from "./cart-list.reducer";
import { ProductCategoryListReducer } from "./product-category-list.reducer";
import { ProductListReducer } from "./product-list.reducer";
import { ProductReducer } from "./product.reducer";

export const reducer: ActionReducerMap<AppState> = {
    productList: ProductListReducer,
    product: ProductReducer,
    categories: ProductCategoryListReducer,
    cart: CartListReducer
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];