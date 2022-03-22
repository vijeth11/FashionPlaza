import { selectCartItems } from './../store/selectors/cart.selector';
import { Cart } from 'src/app/store/model/cart.model';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/model/app-state.models';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddOrUpdateCartItemsAction } from '../store/actions/cart.action';
import { AuthenticationService } from '../shared/services/Authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public get isAuthenticated():boolean{
    return this.auth.isAuthenticated()
  }
  cartItems$:Observable<Cart[]>|undefined = undefined;
  private updatedCartItemsList:Cart[] = [];
  constructor(private store:Store<AppState>,private auth:AuthenticationService) {
     this.cartItems$ = this.store.pipe(select(selectCartItems));
   }

   getTotalCost(cartItems:Cart[]):number{
     return cartItems.reduce((acc,prev) => acc + (+prev.productPrice * +prev.quantity),0)
   }

   onQuantityUpdate(event:any,cart:Cart){
    cart.quantity = event.target.value
    let index = this.updatedCartItemsList.findIndex(ele => ele.productId == cart.productId);
    if(index > -1){
      this.updatedCartItemsList[index] = cart;
    }else{
      this.updatedCartItemsList.push(cart);
    }
   }

   updateTheCart(){
    if(this.isAuthenticated){
      // add the product to cart and load cart page
      this.store.dispatch(new AddOrUpdateCartItemsAction(this.updatedCartItemsList));
      this.updatedCartItemsList=[];
    }
  }
}
