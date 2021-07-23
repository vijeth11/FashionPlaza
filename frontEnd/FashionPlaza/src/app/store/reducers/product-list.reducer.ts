import { productListAdapter } from './../entity/product-list-entity';
import { ProductListAction, ProductListActionType } from "../actions/product-list.action";
import { ProductListState } from "../entity/product-list-entity";

const initialState:ProductListState = productListAdapter.getInitialState({
    loading:false,
    error:undefined,
})

export function ProductListReducer(state:ProductListState = initialState, action:ProductListAction ){
    switch(action.type){
        case ProductListActionType.LOAD_PRODUCT_LIST:
            return {
                ...state,
                loading:true,
            };
            
        case ProductListActionType.LOAD_PRODUCT_LIST_SUCCESS:
            return productListAdapter.setAll(action.payload,{
                ...state,
                loading: false
            });
        case ProductListActionType.LOAD_PRODUCT_LIST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading:false
            };
        default:
            return state;
    }
}