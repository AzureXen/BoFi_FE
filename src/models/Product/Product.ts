export default class Product {
    productId:number;
    productName: string;
    productDescription: string;
    productBrand: number;
    productPrice: number;
    productImageUrl: string;
    productStock: number;
    productCategoryId: number;
    productCollabStatus: number;
    constructor(productId: number, productName: string, productDescription: string, productBrand: number, productPrice: number,
                productImageUrl: string, productStock: number, productCategoryId: number, productCollabStatus: number){

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
}
