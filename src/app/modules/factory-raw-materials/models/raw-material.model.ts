export class RawMaterial {
      Id !:number;
      ProductId!:number|undefined;
      CustomItemName !:string;
      Name !:string;
      MaximumMonthlyConsumption !:number;
      AverageWeightKG !:number;
      Description !:string;
     // FactoryId !:number;
      AttachmentId !:number
      PaperId!:number;
      PhotoId!:number;
      UnitId!:number|undefined;
      ProductIds:number[]=[];
      FactoryId !:number;

}
