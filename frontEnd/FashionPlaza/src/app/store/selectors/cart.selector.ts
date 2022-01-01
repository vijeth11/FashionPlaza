import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartAdapter, CartState } from "../entity/cart-entity";
import { AppState } from "../model/app-state.models";

export const selectCart = createFeatureSelector<AppState,CartState>('cart');

export const selectCartLoading = createSelector(
    selectCart,
    (cart:CartState) => cart.loading
)

export const selectCartError = createSelector(
    selectCart,
    (cart:CartState) => cart.error
)

export const selectCartItems = createSelector(
    selectCart,
    cartAdapter.getSelectors().selectAll
)

export const selectCartItemsLength = createSelector(
    selectCart,
    cartAdapter.getSelectors().selectTotal
)