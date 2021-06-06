import { productListAdapter } from './../entity/product-list-entity';
import { createFeatureSelector,createSelector } from '@ngrx/store';
import { ProductListState } from '../entity/product-list-entity';
import { AppState } from './../model/app-state.models';

export const selectProductList = createFeatureSelector<AppState,ProductListState>('productList');
export const selectProductListLoading = createSelector(
    selectProductList,
    (productList) => productList.loading
)
export const selectProductListError = createSelector(
    selectProductList,
    (productList) => productList.error
)

export const selectProductListItems = createSelector(
    selectProductList,
    productListAdapter.getSelectors().selectAll
)