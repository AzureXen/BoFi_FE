export interface ProductDetailFetched {
    id:             number;
    name:           string;
    description:    string;
    brand_id:       number;
    price:          number;
    main_image_url: string;
    stock:          number;
    category_id:    number;
    collab_status:  number;
    size:           string[];
    create_date:    null;
    update_date:    null;
}