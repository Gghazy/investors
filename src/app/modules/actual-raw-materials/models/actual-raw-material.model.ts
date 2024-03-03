import { RawMaterial } from "../../factory-raw-materials/models/raw-material.model";

export class ActualRawMaterial {

    Id !:number;
    PeriodId!:number;
    RawMaterialId !:number;
    StockUnitId !:number;
    UsageUnitId !:number;
    CurrentStockQuantity_KG !:number;
    UsedQuantity_KG !:number;
    CurrentStockQuantity !:number;
    UsedQuantity !:number;
    IncreasedUsageReason !:string;
    AverageWeightKG !:number;
}
