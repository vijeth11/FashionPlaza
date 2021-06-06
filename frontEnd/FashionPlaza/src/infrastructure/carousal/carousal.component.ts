import { environment } from './../../environments/environment';
import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'app-carousal',
    styleUrls: ['./carousal.component.css'],
    templateUrl: './carousal.component.html'
})

export class CarousalComponent implements AfterViewInit{

    private currentIndex:number = 0;
    @Input() content:{type:string,message:string,image:string}[]=[];

    constructor(private el:ElementRef){
        
    }

    ngAfterViewInit() {
        this.el.nativeElement.querySelector('#messageBox').classList.remove('message');
        this.el.nativeElement.querySelector('#messageBox').classList.add('inactive-image');
        this.hideInactiveImages(2000);
    }

    getImageByCurrentIndex():string{
        if(this.content.length > 0){
            return "../../assets/images/"+this.content[this.currentIndex].image;
        }
        return "";
    }

    leftClick(){
        if(this.currentIndex == 0){
            this.currentIndex = this.content.length;
        }
        this.currentIndex--;
        this.el.nativeElement.querySelector('#messageBox').classList.remove('message');
        this.el.nativeElement.querySelector('#messageBox').classList.add('inactive-image');
        this.hideInactiveImages(2000);
    }

    rightClick(){
        if(this.currentIndex == this.content.length-1){
            this.currentIndex = 0;
        }else{
            this.currentIndex++;
        }
        this.el.nativeElement.querySelector('#messageBox').classList.remove('message');
        this.el.nativeElement.querySelector('#messageBox').classList.add('inactive-image');
        this.hideInactiveImages(2000);
    }

    isThisCurrentIndex(index):boolean{
        return this.currentIndex == index;
    }

    getMessage():string{
        return this.content[this.currentIndex].message;
    }

    getButtonMessage():string{
        return "shop "+ (this.getCurrentType() == "women" ? "women's" :"men's");
    }

    getCurrentType():string{
        return this.content[this.currentIndex].type;
    }

    hideInactiveImages(time:number=0){
        setTimeout(() => {
            this.el.nativeElement.querySelector('#messageBox').classList.remove('inactive-image'); 
            this.el.nativeElement.querySelector('#messageBox').classList.add('message');    
        },time);
    }

    getImageUrl(image:string){
        return environment.imageUrl + image;
    }
}