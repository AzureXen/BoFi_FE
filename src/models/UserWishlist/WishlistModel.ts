import type { WishlistModelFetched } from "./WishlistModelFetched.ts";
import type {PagingInfo} from "../PagingInfo.ts";

export class WishlistModel {
    name: string;
    sizeName: string;
    price: number;
    mainImageUrl: string;

    constructor(name: string, sizeName: string, price: number, mainImageUrl: string) {
        this.name = name;
        this.sizeName = sizeName;
        this.price = price;
        this.mainImageUrl = mainImageUrl;
    }

    static fromApi(raw: WishlistModelFetched): WishlistModel {
        return new WishlistModel(
            raw.name,
            raw.size_name,
            raw.price,
            raw.main_image_url
        );
    }
}
export interface WishlistResponse {
    items: WishlistModel[];
    paging: PagingInfo;
}
