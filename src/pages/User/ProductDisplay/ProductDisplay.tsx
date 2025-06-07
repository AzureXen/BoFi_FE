import "./ProductDisplay.css"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

import axios from "axios";

import {API_BASE_URL} from "../../../config.ts";
import ProductGrid from "../../../components/Product/ProductGrid.tsx";
import {useEffect, useState} from "react";
import Product from "../../../models/Product/Product.ts";
import type ProductFetched from "../../../models/Product/ProductFetched.ts";
const GET_ALL_PRODUCT_API = "/products";

import AllProductBanner from "../../../assets/product-display/all_products.png"
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";

const fetchAllProducts = async (params: string) =>{
    try{
        const response =
            await axios.get(`${API_BASE_URL}${GET_ALL_PRODUCT_API}?${params}`)
        console.log("responded data:")
        console.log(response.data.data.items);
        return response.data.data.items.map( (product: ProductFetched)=> {
            return new Product(
                product.id,
                product.name,
                product.description,
                product.brand_id,
                product.price,
                product.main_image_url,
                product.stock,
                product.category_id,
                product.collab_status,
            )
        });
    }catch(error){
        console.error("Error while fetching activity course", error);
        throw error;
    }
}

const ProductDisplay = () =>{
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                page_size: "12",
                sort_by: "price",
                sort_order: "asc",
            });

            try {
                const data = await fetchAllProducts(params.toString());
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleNextPage = () => {
        if (currentPage < maxPage) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    if(loading){return(<></>)}

    return(
        <>
            <div className="product-display">
                <Header/>
                <ShortBanner imgSrc={AllProductBanner} title={"Shop"}/>
                {products.length > 0 && <ProductGrid products={products}/>}

                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {maxPage}</span>
                    <button onClick={handleNextPage} disabled={currentPage === maxPage}>
                        Next
                    </button>
                </div>

            </div>

            <Footer/>
        </>
    )
}
export default ProductDisplay;