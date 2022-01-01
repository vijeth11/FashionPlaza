import { AddCartItemAction } from './../store/actions/cart.action';
import { FassionPlazaService } from './../shared/services/fassionplaza.service';
import { ProductList } from './../store/model/product-list.model';
import { selectProductItem } from './../store/selectors/product.selectors';
import { LoadProductAction } from './../store/actions/product.action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/model/app-state.models';
import { Product } from '../store/model/product.model';
import * as math from '../shared/utils/MathOperations';
import { LoadProductListAction } from '../store/actions/product-list.action';
import { selectProductListItems } from '../store/selectors/product-list.selector';
import { Subscription, Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/Authentication.service';
import { Cart } from '../store/model/cart.model';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  
  
  private productSubscriber$:Subscription;
  private _selectedProduct:Product;

  public productListSubscriber$:Observable<ProductList[]>;
  public informationDisplay:string = 'description';
  public displayImage:string = '';
  public quantity:number = 1;

  public get product(){
    return this._selectedProduct;
  }  

  constructor(private store:Store<AppState>, 
    private activatedRoute:ActivatedRoute,
     private auth:AuthenticationService, 
     private route: Router,
     private fassion:FassionPlazaService) {
    this.activatedRoute.params.subscribe(data => {
      this.getProductDetails(data['id']);      
    });
   }

  ngOnInit() {
  }

  private getProductDetails(id){
    this.store.dispatch(new LoadProductAction(id));
    this.productSubscriber$ = this.store.pipe(select(selectProductItem)).subscribe((product:Product) => {
      this._selectedProduct = product;
      if(this._selectedProduct){
        this.setDisplayImage(this._selectedProduct.PrimaryImage);
        this.store.dispatch(new LoadProductListAction({type:this._selectedProduct.Type,category:this._selectedProduct.Subtype,pageNumber:1}));
        this.productListSubscriber$ = this.store.pipe(select(selectProductListItems));
      }        
    });
  }

  getListOfNumber(end){
    return math.Range(end);
  }

  setDisplayImage(img:string){
    this.displayImage = img;
  }

  loadProduct(id){
    this.getProductDetails(id);
  }
  
  ngOnDestroy(){    
    this.productSubscriber$.unsubscribe();
  }

  addItemToCart(){
    let cartItem = <Cart>{        
      productPrice:this.product.Cost,
      productId:this.product.id,
      productImage:this.product.PrimaryImage,
      productName:this.product.Name,
      quantity:1
    }
    if(this.auth.isAuthenticated()){
      // add the product to cart and load cart page
      this.store.dispatch(new AddCartItemAction(cartItem));
    }else{
      this.fassion.addItemToCartList(cartItem);
      this.route.navigateByUrl('/login/existing?returnUrl=about');
    }
  }
}
