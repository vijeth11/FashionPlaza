import { Subscription } from "rxjs";
import { combineAll, concatAll } from "rxjs/operators";
import { CartActionType, CartListAction } from "../actions/cart.action";
import { cartAdapter, CartState } from "../entity/cart-entity";
import { Cart } from "../model/cart.model";

const initialState:CartState = cartAdapter.getInitialState({
    loading:false,
    error:undefined,
})

export function CartListReducer(state:CartState = initialState, action:CartListAction ){
    switch(action.type){ 
        case CartActionType.LOAD_CART_LIST:
            return {
                ...state,
                loading: true
            }  
        case CartActionType.LOAD_CART_LIST_SUCCESS:
            // filtering to remove duplicates before adding it to Store
            let previousList = cartAdapter.getSelectors().selectAll(state);
            let finalList = previousList && previousList.length > 0 ? previousList.filter((cart:Cart) => {
                return !action.payload.some((actionCart:Cart) => cart.productName == actionCart.productName && cart.productId == actionCart.productId)
            }) : action.payload;
            
            if(finalList && finalList.length > 0)
                return cartAdapter.addMany(finalList,{
                    ...state,
                    loading:false
                });
            return state;
        case CartActionType.LOAD_CART_LIST_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.payload
            }    
        case CartActionType.ADD_OR_UPDATE_CART_ITEMS:
            let deleteCarts = action.payload.filter(cart => cart.quantity == 0);
            let addCarts = action.payload.filter(cart => cart.quantity != 0);
            let updatedState = cartAdapter.upsertMany(addCarts,{...state});
            return cartAdapter.removeMany(deleteCarts.map(x => x.productId.toString()),{...updatedState});
        default:
            return state;
    }
}