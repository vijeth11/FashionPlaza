import { ProductState, productAdapter } from './../entity/product-entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../model/app-state.models';

export const selectProduct = createFeatureSelector<AppState,ProductState>('product');

export const selectProductLoading = createSelector(
    selectProduct,
    (product) => product.loading
)

export const selectProductError = createSelector(
    selectProduct,
    (product) => product.error
)

export const selectProductItem = createSelector(
    selectProduct,
    productAdapter.getSelectors().selectEntities[0]
)