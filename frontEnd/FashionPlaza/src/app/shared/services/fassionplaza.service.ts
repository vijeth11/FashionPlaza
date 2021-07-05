import { environment } from '../../../environments/environment';
import { Product } from '../../store/model/product.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductList } from "../../store/model/product-list.model";

@Injectable({
    providedIn:'root'
})
export class FassionPlazaService{
    private PRODUCT_URL = environment.production?"/api/":"http://localhost:8000/api/";

    constructor(private http: HttpClient){

    }

    getProductListItems(type:string, category:string){        
        let url = this.PRODUCT_URL+"products/"
        if(type){
            url = url+"?Type="+type;
            if(category){
                url = url+"&Subtype="+category;
            }
        }
        return this.http.get<ProductList[]>(url);
    }

    getProductDetails(productId){
        return this.http.get<Product>(this.PRODUCT_URL+"product/"+productId+"/");
    }

    getProductCategoryList(){
        return this.http.get<{Type:string,Subtype:string}[]>(this.PRODUCT_URL+"product-category/");
    }
}