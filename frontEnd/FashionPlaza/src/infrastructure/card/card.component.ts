import { Component, Input } from "@angular/core";

@Component({
    selector:'app-card',
    templateUrl:'./card.component.html',
    styleUrls:['./card.component.css']
})

export class CardComponent{
    @Input() displaySales:boolean=false;
    @Input() cost:number=220.00;
    @Input() company:string="Baserange";
    @Input() primaryImage:string='../../assets/images/women/jumpsuits/jumpsuit1.jpg';
    @Input() name:string="Zabra Jumpsit in Black";
}