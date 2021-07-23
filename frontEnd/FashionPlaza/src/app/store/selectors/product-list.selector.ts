import { productListAdapter } from './../entity/product-list-entity';
import { createFeatureSelector,createSelector } from '@ngrx/store';
import { ProductListState } from '../entity/product-list-entity';
import { AppState } from './../model/app-state.models';
import { ProductList } from '../model/product-list.model';

export const selectProductList = createFeatureSelector<AppState,ProductListState>('productList');
export const selectProductListLoading = createSelector(
    selectProductList,
    (productList:ProductListState) => productList.loading
)

export const selectProductListError = createSelector(
    selectProductList,
    (productList:ProductListState) => productList.error
)

export const selectProductListItems = createSelector(
    selectProductList,
    productListAdapter.getSelectors().selectAll
)

export const selectFilteredProductListItems = createSelector(
    selectProductListItems,
    (productList:ProductList[], props:string) => productList.filter(product => product.Subtype.toLowerCase() === props.toLowerCase())
    )