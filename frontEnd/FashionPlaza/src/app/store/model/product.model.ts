export interface Product{
    id:number;
    images:ProductImages[];
    Name:string;
    Description:string;
    Cost:number;
    Company:string;
    Type:string;
    Subtype:string;
    Discount:number;
    Sale:boolean;
    PrimaryImage:string;
    BestSeller:boolean;
    ItemAddedTime:string;
}

export interface ProductImages{
    id:number;
    image:string;
    ProductId:number;
}