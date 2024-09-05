export class RawMaterial {
      Id !:number;
      ProductId!:number|undefined;
      CustomItemName !:string;
      Name !:string;
      MaximumMonthlyConsumption !:number;
      AverageWeightKG !:number;
      Description !:string;
     // FactoryId !:number;
     // AttachmentId !:number
      PaperId!:number;
      PhotoId!:number;
      PhotoName!:string;
      PaperName!:string;
      UnitId!:number|undefined;
      FactoryProductId :FactoryProductInRaw[]=[];
      FactoryId !:number;
PeriodId!:number;
RawMaterialName!:string;
}
export class FactoryProductInRaw
{
       ProductNameInRaw !:string;
      ProductId  !:number;
}

export class ProductSearchModel
{
      FactoryId !:number;
      PeriodId!:number;
      CurrentPage!:number;
      PageSize!:number;
      SearchText!:string;

}
export class DeletesIds {
      ids:number[]=[]

}