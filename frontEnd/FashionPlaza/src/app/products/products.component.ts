import { FassionPlazaService } from 'src/app/shared/services/fassionplaza.service';
import { selectFilteredProductListItems } from './../store/selectors/product-list.selector';
import { LoadProductListAction } from './../store/actions/product-list.action';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/model/app-state.models';
import { selectProductListItems } from '../store/selectors/product-list.selector';
import { ProductList } from '../store/model/product-list.model';
import { selectProductCategories } from '../store/selectors/product-category-list.selector';
import { Range } from '../shared/utils/MathOperations';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  clothDetails:ProductList[][];
  isAllDataLoaded:boolean;
  selectedType:string = "";
  selectedSubType:string="";
  categoryList:string[] = ["Select"];
  sortList:string[] = ["Select","Featured","Alphabetically A-Z","Alphabetically Z-A","Price Low To High","Price High To Low","Date Old To New", "Date New To Old"];
  itemsPerPage:number = 0;
  currentPageNumber:number = 1;
  totalPages:number = 0;
  private filteredProductsSubscribe$:any;
  private productsSubscribe$:any;
  private sortedDataSubscriber$:any;
  private totalRecords:number = 0;

  constructor(private store:Store<AppState>, private activatedRoute:ActivatedRoute,private route:Router, private fassionService:FassionPlazaService) {
    this.itemsPerPage = this.fassionService.getListCountPerPage();    
    this.activatedRoute.params.subscribe(data => {       

      if(this.selectedType != data["type"]){
        this.selectedType = data["type"];        
        this.store.dispatch(new LoadProductListAction({type:this.selectedType,category:this.selectedSubType,pageNumber:this.currentPageNumber}));    
      }
      
      this.store.pipe(select(selectProductCategories)).subscribe(data => {
        this.categoryList = ["Select"];
        for(let item of data){
          if(item.Type.toLowerCase() === this.selectedType.toLowerCase()){
            this.categoryList.push(item.Subtype[0].toUpperCase()+item.Subtype.slice(1,item.Subtype.length))
          }
        }
      });  

      if(data["category"]){
        this.selectedSubType = data["category"];
        this.filteredProductsSubscribe$ = this.store.select(selectFilteredProductListItems,data["category"]).subscribe( result => {
          this.loadClothDetails(result);
        }); 
      }else{
        this.selectedSubType = "";
        this.productsSubscribe$ = this.store.pipe(select(selectProductListItems)).subscribe(result => {
          this.loadClothDetails(result);
        })
      }    
      
    });
   } 

  ngOnInit() {
    
  }  

  loadClothDetails(data:ProductList[]){
    this.clothDetails = [[]];
    let countw = 0;
    this.totalRecords = data[0].TotalRecords;
    this.totalPages = Math.trunc(this.totalRecords/this.itemsPerPage);
    if(this.totalRecords % this.itemsPerPage == 0 ){
      this.totalPages += 1;
    }
    
    for(let i of data)
    {
      if(this.clothDetails[countw].length == 6){
          countw++;
          this.clothDetails.push([]);
      }
      this.clothDetails[countw].push(i);          
    }
    // if(data && data.length > 0){
    //   this.clothDetails[0][0].Name = "hello";
    // }
  }

  categorySelected(event:any){
    let url = "products/"+this.selectedType+"/"+(event.target.value && event.target.value.toLowerCase() != "select" ? event.target.value.toLowerCase() : "");
    this.route.navigateByUrl(url);
  }

  sortChanged(event){
    let data = this.clothDetails.reduce( (prev,next) => prev.concat(next));
    switch(event.target.value){
      case this.sortList[1]:
        data = data.sort((a,b) => Number(a.BestSeller) - Number(b.BestSeller));
        break;
      case this.sortList[2]:
        data = data.sort((a,b) => {
          if(a.Name.toLowerCase() > b.Name.toLowerCase())
            return 1;
          if(a.Name.toLowerCase() == b.Name.toLowerCase())
            return 0;
          if(a.Name.toLowerCase() < b.Name.toLowerCase())
            return -1;
        });
        break;
      case this.sortList[3]:
        data = data.sort((a,b) => {
          if(b.Name.toLowerCase() > a.Name.toLowerCase())
            return 1;
          if(a.Name.toLowerCase() == b.Name.toLowerCase())
            return 0;
          if(b.Name.toLowerCase() < a.Name.toLowerCase())
            return -1;
        });
        break;
      case this.sortList[4]:
        data = data.sort((a,b) => {
          let aDiscount = a.Discount ? a.Cost * a.Discount/100 : 0;
          let bDiscount = b.Discount ? b.Cost * b.Discount/100 : 0;
          return (a.Cost-aDiscount) - (b.Cost-bDiscount);
        });
        break;
      case this.sortList[5]:
        data = data.sort((a,b) => {
          let aDiscount = a.Discount ? a.Cost * a.Discount/100 : 0;
          let bDiscount = b.Discount ? b.Cost * b.Discount/100 : 0;
          return  (b.Cost-bDiscount) - (a.Cost-aDiscount);
        });
        break;      
    }
    this.loadClothDetails(data);
  }

  loadProduct(productId:number){
    this.route.navigateByUrl("/products/"+this.selectedType+"/detail/"+productId.toString());
  }

  changePageNumber(pageNumber:number){   
    this.currentPageNumber = pageNumber > this.totalPages ? 1 : pageNumber;
    this.store.dispatch(new LoadProductListAction({type:this.selectedType,category:this.selectedSubType,pageNumber:this.currentPageNumber}));
  }

  ngOnDestroy(): void {
    if(this.productsSubscribe$){
      this.productsSubscribe$.unsubscribe();
    }
    if(this.filteredProductsSubscribe$){
      this.filteredProductsSubscribe$.unsubscribe();
    }
    if(this.sortedDataSubscriber$){
      this.sortedDataSubscriber$.unsubscribe();
    }
  }
}
