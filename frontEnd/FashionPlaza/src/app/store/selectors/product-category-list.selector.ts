import { AppState } from 'src/app/store/model/app-state.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectProductCategories = createFeatureSelector<AppState,{Type:string,Subtype:string,Loading:boolean,Error:Error}[]>('categories');

export const selectProductCategoriesLoading = createSelector(
    selectProductCategories,
    (categories) => categories[0].Loading
)

export const selectProductCategoriesError = createSelector(
    selectProductCategories,
    (categories) => categories[0].Error
)