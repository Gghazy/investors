export class InspectorModel {
    Id!:number;
    Name!:string;
    Email!:string;
    Phone!:string;
    OwnerIdentity!:string;
    Status!:number;
    FactoryEntityId!:number;
    FactoryId!:number;
    FactoryIds:number[]=[];
    FactoryInfo:any[]=[];
}
export class InspectorFactory {
    Id!:number;
    CommerialNumber!:string;
    FactoryName!:string;
   
}