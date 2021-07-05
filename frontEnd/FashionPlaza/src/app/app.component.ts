import { LoadProductCategoryListAction } from './store/actions/product-category-list.action';
import { selectProductCategories } from './store/selectors/product-category-list.selector';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './store/model/app-state.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FashionPlaza';
  $productCategories;
  constructor(private store:Store<AppState>){

  }

  ngOnInit(){
    this.$productCategories = this.store.pipe(select(selectProductCategories));

    this.store.dispatch(new LoadProductCategoryListAction());
  }
}
