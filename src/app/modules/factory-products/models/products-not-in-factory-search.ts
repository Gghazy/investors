import { SearchCriteria } from "src/app/core/models/search-criteria";

export class ProductsNotInFactorySearch extends SearchCriteria {

    FactoryId!:number;
    TxtSearch!:string;
}
