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
        DesignedCapacityUnitId!:number|undefined;
        DesignedCapacityUnitName!:string;
        ActualProductionUintId!:number|undefined;
        ActualProductionUintName!:string;
        Comments !: number;
        InspectAcuProductName!:string;
        IncreaseReasonId !: number;
        IncreaseReasonCorrect!:number;
        IncreaseReason!:string;
        IsIncreaseReasonCorrect!:boolean;
}
