

export default class ProductFetched {
    id: number;
    name: string;
    description: string;
    brand_id: number;
    price: number;
    main_image_url: string;
    stock: number;
    category_id: number;
    collab_status: number;
    constructor( id: number, name: string, description: string,
                 brand_id: number, price: number, main_image_url: string, stock: number,
                 category_id: number, collab_status: number )
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.brand_id = brand_id;
        this.price = price;
        this.main_image_url = main_image_url;
        this.stock = stock;
        this.category_id = category_id;
        this.collab_status = collab_status;
    }
}

// "items": [
//     {
//         "id": 1,
//         "name": "DirtyCoins With Colibri T-Shirt White",
//         "description": "Product Details:\n• Available sizes: XS – S – M – L – XL\n• Material: Cotton\n• Regular fit\n• Artwork using screen printing technology\nSize Chart:",
//         "brand_id": 1,
//         "price": 18,
//         "main_image_url": "https://bizweb.dktcdn.net/100/467/832/products/1.png?v=1746606507147",
//         "stock": 0,
//         "category_id": 1,
//         "collab_status": 0,
//         "size": [],
//         "create_date": null,
//         "update_date": null
//     },