import type {ProductTypeFetched} from "./ProductTypeFetched.ts";

export default class ProductType{
    type_id : number;
    type_name : string;
    constructor(type_id : number, type_name : string){
        this.type_id  = type_id ;
        this.type_name  = type_name ;
    }
    static fromApi(raw: ProductTypeFetched): ProductType{
        return new ProductType(
            raw.id,
            raw.name_category
        );
    }
}