import { selectProductItem } from './../store/selectors/product.selectors';
import { LoadProductAction } from './../store/actions/product.action';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/model/app-state.models';
import { Product } from '../store/model/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private store:Store<AppState>, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(data => {
      this.store.dispatch(new LoadProductAction(data['id']));
      this.store.pipe(select(selectProductItem)).subscribe((product:Product) => {
        console.log(product);
      });
    });
    
   }

  ngOnInit() {
  }

}
