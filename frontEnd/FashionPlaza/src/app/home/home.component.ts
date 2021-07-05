import { ProductList } from './../store/model/product-list.model';
import { selectProductListItems, selectProductListLoading } from './../store/selectors/product-list.selector';
import { environment } from './../../environments/environment';
import { Component, OnInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/model/app-state.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  storeImage:string = environment.imageUrl + "store.jpg";
  homeProductImage:string = environment.imageUrl + "home-product.jpg";
  homeAboutImage:string = environment.imageUrl + "About-Home.jpg";
  marketContent:{type:string,message:string,image:string}[]= [
    {
      type:"women",
      message:"Up to 25% off women jackets!",
      image:"women.jpg"
    },
    {
      type:"men",
      message:"New shirt collection for men",
      image:"men.jpg"
    }
  ];
  ClothsTypeWomen:ProductList[][]=[[]];
  ClothsTypeMen:ProductList[][]=[[]];
  constructor(private el:ElementRef,private store:Store<AppState>) { 

  }

  ngOnInit() {
    this.store.pipe(select(selectProductListItems)).subscribe(data => {
      let countw = 0, countm =0;
      for(let i of data)
      {
        if(i.Type.toLowerCase() == "women"){
          if(this.ClothsTypeWomen[countw].length == 4){
            countw++;
            this.ClothsTypeWomen.push([]);
          }
          this.ClothsTypeWomen[countw].push(i);
        }else{
          if(this.ClothsTypeMen[countm].length==4){
            countm++;
            this.ClothsTypeMen.push([]);
          }
          this.ClothsTypeMen[countm].push(i);
        }
      }
    });    

    this.store.pipe(select(selectProductListLoading)).subscribe(data => {
      alert(data);
    });
  }

  tabbutton(event,id){
    let selector = id.includes('women') ? '.women-clothing' : '.men-clothing'
    let tablinks = this.el.nativeElement.querySelectorAll(selector+" .tablinks");
    for(let link of tablinks){
      link.classList.remove("active");
    }
    event.target.classList.add("active");
    let tabcontents = this.el.nativeElement.querySelectorAll(selector+ " .tabcontent");
    for(let content of tabcontents){      
      content.classList.remove("active");      
    }
    this.el.nativeElement.querySelector("#"+id).classList.add('active');
  }

  getTabContent(tab:string, clothType:string){
    let data = [[]];
    let count = 0
    let items = clothType == "women" ? this.ClothsTypeWomen : this.ClothsTypeMen;
    for(let i of items){
      for(let j of i){            
        if(data[count].length == 4){
          count++;
          data[count]=[]
        }
        switch(tab) {
          case "bestSeller":
            if(j.BestSeller){
              data[count].push(j);
            }
            break;
          case "newItem":
            let date = new Date(j.ItemAddedTime);
            if( date > new Date(new Date().setMonth(new Date().getMonth() - 1))){
              data[count].push(j);
            }
            break;
          case "sale":
            if(j.Sale){
              data[count].push(j)
            }
            break;
        }
      }
    }
    return data;
  }
  
}
