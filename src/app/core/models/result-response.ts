export class ResultResponse<T> {
    Items!:T[];
    TotalCount!:number;
    PageNumber!:number;
    PageSize!:number;
    PageCount!:number;
}
