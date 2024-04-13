export class FactoryContactsModel {
    Id!:number;
FactoryId!:number;
PeriodId!:number;
OldOfficerPhoneId!:number;
OldOfficerEmail:string='';
IsOfficerPhoneCorrect!:boolean;
IsOfficerMailCorrect!:boolean;
NewOfficerPhoneId!:number;
NewOfficerEmail:string='';
Comments!:string;

}
