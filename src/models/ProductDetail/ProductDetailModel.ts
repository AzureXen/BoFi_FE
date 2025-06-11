import Product from "../Product/Product";
import type { ProductDetailFetched } from "./ProductDetailFetched";

export default class ProductDetailModel {
    product: Product;
    size: string[];
    createDate: Date | null;
    updateDate: Date | null;

    constructor(raw: ProductDetailFetched) {
        this.product = new Product(
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
        this.size = raw.size;
        this.createDate = raw.create_date ? new Date(raw.create_date) : null;
        this.updateDate = raw.update_date ? new Date(raw.update_date) : null;
    }
}

export interface ProductDetailResponse {
    items: ProductDetailFetched;
}