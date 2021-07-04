import { ProductCategoryListAction, ProductCategoryListActionType } from '../actions/product-category-list.action';

let initialValue = [{Type:"",Subtype:"",Loading:false,Error:null}];

export function ProductCategoryListReducer(state:{Type:string, Subtype:string, Loading: boolean, Error: Error}[] =  initialValue, action:ProductCategoryListAction ){
    switch(action.type){
        case ProductCategoryListActionType.LOAD_PRODUCT_LIST:
            return [{
                ...initialValue[0],
                Loading:true
            }];
        case ProductCategoryListActionType.LOAD_PRODUCT_LIST_SUCCESS:
            state = []
            action.payload.forEach(el => {
                state.push({...el,Loading:false, Error:null});
            });
            return [...state];
        case ProductCategoryListActionType.LOAD_PRODUCT_LIST_FAILURE:                        
            return [{
                ...initialValue[0],
                Error:action.payload
            }];
        default:
            return state;
    }
}