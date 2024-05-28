export class FinancialFileModel {
    Id !: number;
    Type !: string;
    Name !: string;
    Path !: string;
    Extension !: string;
    AttachmentId !: number;
    FactoryFinancialId!: number;
    FactoryId!:number;
    PeriodId!:number;
}
