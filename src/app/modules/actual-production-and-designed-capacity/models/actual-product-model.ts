export class ActualProductModel {
    Id!:number;
    ActualProductionAndCapacityId!:number;
    ProductName!:string;
    FactoryProductId!:number;
    DesignedCapacity!:number;
    DesignedCapacityUnitId!:number|undefined;
    DesignedCapacityUnitName!:string;
    ActualProduction!:number;
    ActualProductionUintId!:number|undefined;
    ActualProductionUintName!:string;
    ActualProductionWeight!:number;
    PeriodId!: number;
    FactoryId!: number;
    ProductId!: number;
    ReasoneForIncreaseCapacity!:number;
    Kilograms_Per_Unit!:number;
    Level12Number!:string
    Level12ItemName!:string
}
