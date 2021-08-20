import { OnlyLoggedInUserGuard } from './shared/gaurds/only-logged-in-user.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoadClothListResolver } from './shared/resolvers/LoadClothList.resolver';
import { LoadProductListAction } from './store/actions/product-list.action';
import { AuthenticationComponent } from './Authentication/authentication.component';

const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent, canActivate:[OnlyLoggedInUserGuard]},
  {path: 'cart', component: CartComponent, canActivate:[OnlyLoggedInUserGuard]},
  {path: 'products/:type/detail/:id',component: ProductDetailComponent},
  {path: 'products/:type', 
    children:[
      {path:':category',component: ProductsComponent},
      {path:'',component: ProductsComponent}
    ]
  },
  {path: 'contact', component: ContactComponent},
  {path: 'home',component: HomeComponent, resolve:{state: LoadClothListResolver}, data: { type: LoadProductListAction, param: ''}},
  {path: 'about',component: AboutComponent},
  {path: 'login/:type',component: AuthenticationComponent},
  {path: '', redirectTo: 'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
