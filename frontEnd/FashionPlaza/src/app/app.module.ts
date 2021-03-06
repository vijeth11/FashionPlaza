import { UserProductsListResolver } from './shared/resolvers/UserProductsList.resolver';
import { CartListEffects } from './store/effect/cart.effect';
import { OnlyLoggedInUserGuard } from './shared/gaurds/only-logged-in-user.guard';
import { LoadClothListResolver } from './shared/resolvers/LoadClothList.resolver';
import { reducer } from './store/reducers/AppState.reducer';
import { InfrastructureModule } from './../infrastructure/infrastructure.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductListEffects } from './store/effect/product-list.effect';
import { ProductEffects } from './store/effect/product.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ProductCategoryListEffects } from './store/effect/product-category-list.effect';
import { AuthenticationComponent } from './Authentication/authentication.component';
import { AuthenticationService } from './shared/services/Authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InfrastructureModule,
    HttpClientModule,
    StoreModule.forRoot(reducer,{
      runtimeChecks:{
        strictStateImmutability:true,
        strictActionImmutability:true,
        strictActionSerializability:true,
        strictStateSerializability:true,
        strictActionTypeUniqueness:true,
      }
    }),
    EffectsModule.forRoot([ProductListEffects, ProductEffects, ProductCategoryListEffects, CartListEffects]),
    StoreDevtoolsModule.instrument({maxAge:25, logOnly:environment.production})
    
  ],
  providers: [
    LoadClothListResolver,
    UserProductsListResolver,
    AuthenticationService,
    OnlyLoggedInUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
