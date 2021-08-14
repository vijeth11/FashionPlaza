import { ProductList } from './../store/model/product-list.model';
import { selectProductItem } from './../store/selectors/product.selectors';
import { LoadProductAction } from './../store/actions/product.action';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/model/app-state.models';
import { Product } from '../store/model/product.model';
import * as math from '../shared/utils/MathOperations';
import { environment } from 'src/environments/environment';
import { LoadProductListAction } from '../store/actions/product-list.action';
import { selectProductListItems } from '../store/selectors/product-list.selector';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  
  private productListSubscriber$:Subscription;
  private productSubscriber$:Subscription;
  private _selectedProduct:Product;

  public informationDisplay:string = 'description';
  public displayImage:string = '';
  public get product(){
    return this._selectedProduct;
  }
  public similiarCollection:ProductList[];

  constructor(private store:Store<AppState>, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(data => {
      this.store.dispatch(new LoadProductAction(data['id']));
      this.store.pipe(select(selectProductItem)).subscribe((product:Product) => {
        this._selectedProduct = product;
        if(this._selectedProduct){
          this.setDisplayImage(this._selectedProduct.PrimaryImage);
            this.store.dispatch(new LoadProductListAction({type:this._selectedProduct.Type,category:this._selectedProduct.Subtype,pageNumber:1}));
            this.productListSubscriber$ = this.store.pipe(select(selectProductListItems)).subscribe((data:ProductList[]) => {
            this.similiarCollection = data;
          })
        }        
      });
    });
   }

  ngOnInit() {
  }

  getListOfNumber(end){
    return math.Range(end);
  }

  setDisplayImage(img:string){
    this.displayImage = img;
  }

  loadProduct(id){
    this.route.navigateByUrl("/products/"+this.selectedType+"/detail/"+productId.toString());
  }
  ngOnDestroy(){
    this.productListSubscriber$.unsubscribe();
    this.productSubscriber$.unsubscribe();
  }
}
