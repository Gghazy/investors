export class FactoryContactsModel {
    Id!:number;
FactoryId!:number;
PeriodId!:number;
OldOfficerPhoneId!:string;
OldOfficerEmail:string='';
IsOfficerPhoneCorrect!:boolean;
IsOfficerMailCorrect!:boolean;
NewOfficerPhoneId!:string;
NewOfficerEmail:string='';
Comments!:string;

}
