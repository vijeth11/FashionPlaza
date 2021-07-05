import { LoadClothListResolver } from './shared/resolvers/LoadClothList.resolver';
import { reducer, metaReducers } from './store/reducers/AppState.reducer';
import { FassionPlazaService } from './shared/services/fassionplaza.service';
import { InfrastructureModule } from './../infrastructure/infrastructure.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfrastructureModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([ProductListEffects, ProductEffects, ProductCategoryListEffects]),
    StoreDevtoolsModule.instrument({maxAge:25, logOnly:environment.production})
  ],
  providers: [FassionPlazaService, LoadClothListResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
