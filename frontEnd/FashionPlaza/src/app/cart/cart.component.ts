import { selectCartItems } from './../store/selectors/cart.selector';
import { Cart } from 'src/app/store/model/cart.model';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/model/app-state.models';
import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddOrUpdateCartItemsAction } from '../store/actions/cart.action';
import { AuthenticationService } from '../shared/services/Authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy{
  public get isAuthenticated():boolean{
    return this.auth.isAuthenticated()
  }
  cartItems:Cart[] = [];
  cartItemSubscribers:Subscription;
  private updatedCartItemsList:Cart[] = [];
  constructor(private store:Store<AppState>,private auth:AuthenticationService,private router:Router) {
     this.cartItemSubscribers = this.store.pipe(select(selectCartItems)).subscribe((items:Cart[]) => {
       this.cartItems = [...items.map(element => {return {...element}})];
     });
   }

  ngOnDestroy(): void {
    this.cartItemSubscribers.unsubscribe();
  }

   getTotalCost():number{
     return this.cartItems.reduce((acc,prev) => acc + (+prev.productPrice * +prev.quantity),0)
   }

   onQuantityUpdate(event:any,cart:Cart){
    if(+event.target.value == 0){
      // to maintain at least one item
      event.target.value = "1";
    }
    cart.quantity = +event.target.value;
    let cartIndex = this.cartItems.indexOf(cart);
    this.cartItems[cartIndex] = cart;     
    let index = this.updatedCartItemsList.findIndex(ele => ele.productId == cart.productId);
    if(index > -1){
      this.updatedCartItemsList[index] = cart;
    }else{
      this.updatedCartItemsList.push(cart);
    }
   }

   removeTheItem(cart:Cart){
      this.cartItems = [...this.cartItems.filter(x => x.productId != cart.productId)];
      cart.quantity = 0;
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

  routeToCheckout(){
    this.router.navigateByUrl('/checkout');
  }
}
