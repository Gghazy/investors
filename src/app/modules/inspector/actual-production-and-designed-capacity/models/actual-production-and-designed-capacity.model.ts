export class ActualProductionAndDesignedCapacityModel  {
        Id !: number;
        FactoryproductId !: number;
        DesignedCapacity !: number;
        IsDesignedCapacityCorrect!:boolean;
        CorrectDesignedCapacity !: number;
        ActualProduction !: number;
        ActualProductionWeight !: number;
        IsActualProductionCorrect!:boolean;
        CorrectActualProduction !: number;
        Comments !: number;
        ProductName!:string;
        IncreaseReasonId !: number;
        IncreaseReasonCorrect!:number;
        IncreaseReason!:string;
        IsIncreaseReasonCorrect!:boolean;
}
