import { ProductActionTypes } from './../actions/product.action';
import { productAdapter, ProductState } from './../entity/product-entity';
import { ProductAction } from "../actions/product.action";

const initState = productAdapter.getInitialState({
    loading:false,
    error:undefined
})

export function ProductReducer(state:ProductState = initState,action:ProductAction){
    
    switch(action.type){
        case ProductActionTypes.LOAD_PRODUCT:
            return {
                ...state,
                loading:true
            };
        case ProductActionTypes.LOAD_PRODUCT_SUCCESS:
            productAdapter.removeAll(state);
            return productAdapter.setOne(action.payload,{
                ...state,
                loading:false    
            });            
        case ProductActionTypes.LOAD_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading:false
            };
        default:
            return state;
    }
}