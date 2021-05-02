import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarousalComponent } from './carousal/carousal.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations:[
    CarousalComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CarousalComponent,
    CardComponent
  ]
})
export class InfrastructureModule {

 }
