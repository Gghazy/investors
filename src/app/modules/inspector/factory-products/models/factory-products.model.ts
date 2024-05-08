export class FactoryProductsModel {
    Id!:number;
    FactoryId!:number;
    ProductId:number | undefined;
    PeriodId!:number;
    PaperId!:number;
    PhotoId!:number;
    CurrentPhotoId!:number;
    ClearPhotoId!:number;
    IsProductPhotoCorrect!:boolean;
    NewProductPhotoId!:number;
    NewProductPaperId!:number;
    Comments!:string;
    ProductName!:string
}

