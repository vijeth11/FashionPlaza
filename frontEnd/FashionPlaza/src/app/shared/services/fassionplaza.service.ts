import { environment } from '../../../environments/environment';
import { Product } from '../../store/model/product.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductList } from "../../store/model/product-list.model";
import { map } from 'rxjs/operators';
import { Cart } from 'src/app/store/model/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './Authentication.service';

@Injectable({
    providedIn:'root'
})
export class FassionPlazaService{
    private PRODUCT_URL = environment.production?"/api/":"http://localhost:8000/api/";
    private listCountPerPage:number = 18;

    private cartItemAddedInProductDetail = new BehaviorSubject<Cart>(null);

    constructor(private http: HttpClient, private authService:AuthenticationService){
    }
    
    addItemToCartList(cart:Cart){
        this.cartItemAddedInProductDetail.next(cart);
    }

    getCartListAsObservable():Observable<Cart>{
        return this.cartItemAddedInProductDetail.asObservable();
    }

    getProductListItems(type:string, category:string, pageNumber: Number){        
        let url = this.PRODUCT_URL+"products/"
        if(type){
            url = url+"?ListCount="+this.listCountPerPage+"&PageNumber="+pageNumber+"&Type="+type;
            if(category && category.toLowerCase()!="select"){
                url = url+"&Subtype="+category;
            }
        }
        return this.http.get<ProductList[]>(url).pipe(map((data:ProductList[]) => {
            for(let i in data)
            data[i].PrimaryImage = (environment.production && data[i].PrimaryImage.indexOf("http") > -1?"":"http://localhost:8000") + data[i].PrimaryImage;
            return data
        }));
    }

    getProductDetails(productId:number){
        return this.http.get<Product>(this.PRODUCT_URL+"product/"+productId+"/").pipe(map(response => {
            response.images.forEach(x => {
                x.image = (environment.production ? '' : "http://localhost:8000") +x.image;
            })
            return response;
        }));
    }

    getProductCategoryList(){
        return this.http.get<{Type:string,Subtype:string}[]>(this.PRODUCT_URL+"product-category/");
    }

    getListCountPerPage():number{
        return this.listCountPerPage;
    }

    getCartListItems(){
        let url = this.PRODUCT_URL+"cart/";
        return this.http.get<Cart[]>(url,{
            headers: {
              Authorization: `Token ${this.authService.getAuthToken()}`,
            }
        }).pipe(
            map((response:Cart[]) => {
                return response.map(cart => {
                    return { ...cart, productImage: (environment.production ? '' : "http://localhost:8000") + cart.productImage }
                });
        }));
    }

    addOrUpdateCartItemsToDatabase(carts:Cart[]):Observable<any>{
        let url = this.PRODUCT_URL+"cart/";
        return this.http.post<any>(url,{"carts":carts.map(x => { 
                return {
                    "Quantity": x.quantity,
                    "ProductId": x.productId
                }
            })
        });
    }
}