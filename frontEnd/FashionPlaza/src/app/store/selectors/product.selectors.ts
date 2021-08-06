import { ProductState, productAdapter } from './../entity/product-entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../model/app-state.models';

export const selectProduct = createFeatureSelector<AppState,ProductState>('product');

export const selectProductLoading = createSelector(
    selectProduct,
    (product:ProductState) => product.loading
)

export const selectProductError = createSelector(
    selectProduct,
    (product:ProductState) => product.error
)

const selectProductItems = createSelector(
    selectProduct,
    productAdapter.getSelectors().selectAll
)

export const selectProductItem = createSelector(
    selectProductItems,
    (products) => products[0]    
)