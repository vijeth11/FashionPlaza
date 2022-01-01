import { selectCartItems } from './../store/selectors/cart.selector';
import { Cart } from 'src/app/store/model/cart.model';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/model/app-state.models';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$:Observable<Cart[]> = of([]);
  constructor(private store:Store<AppState>) {
     this.cartItems$ = this.store.pipe(select(selectCartItems));
   }

   getTotalCost(cartItems:Cart[]):number{
     return cartItems.reduce((acc,prev) => acc + (+prev.productPrice * +prev.quantity),0)
   }
}
