export class FactoryContactModel {
    Id !: number;
    OfficerPhone !: phoneModel;
    OfficerEmail !: string;
    ProductionManagerPhone !: phoneModel;
    ProductionManagerEmail !: string;
    FinanceManagerPhone !: phoneModel;
    FinanceManagerEmail !: string;
    FactoryId !: number;
}

export class phoneModel {

    countryCode!: string;
    dialCode!: string;
    e164Number!: string;
    internationalNumber!: string;
    nationalNumber!: string;
    number!: string;

}


