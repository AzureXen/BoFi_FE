import "./ProductRecommend.css"
import Product, {type ProductResponse} from "../../models/Product/Product.ts";
import axios from "axios";
import type {ProductFetched} from "../../models/Product/ProductFetched.ts";
import type {PagingInfo} from "../../models/PagingInfo.ts";
import {API_BASE_URL} from "../../config.ts";
import {useEffect, useState} from "react";
import ProductGrid from "../Product/ProductGrid.tsx";
// const GET_ALL_PRODUCT_API = "/products";
// const fetchProduct = async (): Promise<ProductResponse> => {
//     try {
//         const params = new URLSearchParams({
//             page: "1",
//             page_size: "4",
//             sort_by: "price",
//             sort_order: "asc",
//         });
//
//         const response = await axios.get<{ data: { items: ProductFetched[]; paging: PagingInfo } }>(
//             `${API_BASE_URL}${GET_ALL_PRODUCT_API}?${params.toString()}`
//         );
//
//         const items = response.data.data.items.map(Product.fromApi);
//         const paging = response.data.data.paging;
//
//         return {
//             items,
//             paging
//         };
//     } catch (error) {
//         console.error("Error while fetching products", error);
//         throw error;
//     }
// };

const GET_RECOMMENDED_PRODUCT_API = "/products/recommend"
const fetchProduct = async (): Promise<ProductResponse> => {
    try {
        const params = new URLSearchParams({
            count: "4",
        });

        const response = await axios.get<{ data: { items: ProductFetched[]; paging: PagingInfo } }>(
            `${API_BASE_URL}${GET_RECOMMENDED_PRODUCT_API}?${params.toString()}`
        );

        const items = response.data.data.items.map(Product.fromApi);
        const paging = response.data.data.paging;

        return {
            items,
            paging
        };
    } catch (error) {
        console.error("Error while fetching products", error);
        throw error;
    }
};

const ProductRecommend = () =>{
    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=>{
        const fetchRecommendProduct = async ()=>{
            try{
                const response = await fetchProduct();
                setProducts(response.items);
            }catch(Error){
                console.error("Error while fetching recommended products;");
                console.error(Error);
            }
        }
        fetchRecommendProduct();
    },[])
    return(
        <>
            <div className="product-recommend">
                <div className="product-recommend-label">
                    <h2>Suggested Items</h2>
                </div>
                {products?.length > 0 &&(
                    <ProductGrid products={products}/>
                )}
            </div>
        </>
    )
}

export default ProductRecommend;