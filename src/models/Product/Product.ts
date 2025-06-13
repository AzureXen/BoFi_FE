import type {ProductFetched} from "./ProductFetched.ts";
import type {PagingInfo} from "../PagingInfo.ts";



export default class Product {
    productId: number;
    productName: string;
    productDescription: string;
    productBrand: number;
    productPrice: number;
    productImageUrl: string;
    productStock: number;
    productCategoryId: number;
    productCollabStatus: number;

    constructor(
        productId: number,
        productName: string,
        productDescription: string,
        productBrand: number,
        productPrice: number,
        productImageUrl: string,
        productStock: number,
        productCategoryId: number,
        productCollabStatus: number
    ) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productBrand = productBrand;
        this.productPrice = productPrice;
        this.productImageUrl = productImageUrl;
        this.productStock = productStock;
        this.productCategoryId = productCategoryId;
        this.productCollabStatus = productCollabStatus;
    }


    static fromApi(raw: ProductFetched): Product {
        return new Product(
            raw.id,
            raw.name,
            raw.description,
            raw.brand_id,
            raw.price,
            raw.main_image_url,
            raw.stock,
            raw.category_id,
            raw.collab_status
        );
    }
}
export interface ProductResponse {
    items: Product[];
    paging: PagingInfo;
}

