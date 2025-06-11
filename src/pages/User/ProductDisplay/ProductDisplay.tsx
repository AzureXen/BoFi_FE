import "./ProductDisplay.css"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

import axios from "axios";

import {API_BASE_URL} from "../../../config.ts";
import ProductGrid from "../../../components/Product/ProductGrid.tsx";
import {useEffect, useState} from "react";
const GET_ALL_PRODUCT_API = "/products";
const GET_ALL_TYPE_API = "/categories";

import AllProductBanner from "../../../assets/product-display/all_products.png"
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";
import {useParams} from "react-router-dom";

import type {PagingInfo} from "../../../models/PagingInfo.ts";
import type {ProductFetched} from "../../../models/Product/ProductFetched.ts";
import Product, {type ProductResponse} from "../../../models/Product/Product.ts";

import ProductType from "../../../models/ProductType/ProductType.ts";
import type {ProductTypeFetched} from "../../../models/ProductType/ProductTypeFetched.ts";

const fetchAllProducts = async (params: string): Promise<ProductResponse> => {
    try {
        const response = await axios.get<{ data: { items: ProductFetched[]; paging: PagingInfo } }>(
            `${API_BASE_URL}${GET_ALL_PRODUCT_API}?${params}`
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

const fetchAllTypes = async (): Promise<ProductType[]> => {
    try {
        const response = await axios.get<{ data: ProductTypeFetched[] }>(
            `${API_BASE_URL}${GET_ALL_TYPE_API}`
        );
        return response.data.data.map(ProductType.fromApi);
    } catch (error) {
        console.error("Error while fetching categories", error);
        throw error;
    }
};

const ProductDisplay = () =>{
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const [selectedType, setSelectedType] = useState<ProductType| null>(null);

    const { typeParam } = useParams();

    // This is only used to show at the search bar!
    const [searchSize, setSearchSize] = useState("");

    // This is used to fetch data.
    const [size, setSize] = useState("");

    const [sortBy, setSortBy] = useState("");

    // FETCH PRODUCT TYPES
    useEffect(()=>{
        const fetchProductTypes = async()=>{
            try{
                const data = await fetchAllTypes();
                setProductTypes(data);
            }catch(error){
                console.error("Error while fetching product types", error);
                throw error;
            }
        }
        fetchProductTypes();
    },[])

    // SET SELECTED PRODUCT TYPE IF PARAM CHANGES, OR PRODUCT TYPES (ALL) CHANGED
    useEffect(()=>{
        const foundType = productTypes.find(
            t => t.type_name.toLowerCase().trim() === typeParam?.toLowerCase().trim()
        );
        if (foundType) {
            setSelectedType(foundType);
        }else {
            setSelectedType(null); // Reset if no matching type is found
        }
    },[productTypes, typeParam])


    // FETCH PRODUCTS
    useEffect(() => {
        const fetchProducts = async () => {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                page_size: "24",
                sort_by: "price",
                sort_order: "asc",
            });
            if (selectedType != null) {
                console.log("fetching With item_type!")
                params.set("item_type", selectedType.type_id.toString());
            }
            if (size != "") {
                console.log("fetching With size", size);
                params.set("size_type", size.toString());
            }

            if (sortBy != "") {
                const [type, order] = sortBy.split("-");
                console.log("splitted values: ");
                console.log("type: ", type);
                console.log("order: ", order);

                params.set("sort_by", type);
                params.set("sort_order", order);
            }

            try {
                const data = await fetchAllProducts(params.toString());
                setProducts(data.items);
                setMaxPage(data.paging.total_pages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, selectedType, size, sortBy]);

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchSize(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSize(searchSize);
        }
    };

    if(loading){return(<></>)}

    return(
        <>
            <div className="product-display">
                <Header/>
                <ShortBanner imgSrc={AllProductBanner} title={(selectedType!=null)? `${selectedType.type_name}` : "Shop"}/>
                <div className="product-filter">
                    <div className={"size-search product-filter-item"}>
                        <input
                            type="text"
                            placeholder="Size"
                            className="size-search-input"
                            value={searchSize}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className={"sort product-filter-item"}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="">Sort by</option>
                            <option value="price-asc">Price ascending</option>
                            <option value="price-desc">Price descending</option>
                            <option value="name-asc">Name ascending</option>
                            <option value="name-desc">Name descending</option>
                        </select>
                    </div>

                </div>
                {products.length > 0 ? (
                    <>
                        <ProductGrid products={products}/>
                        <div className="pagination">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span style={{color: "Black", margin: "0 20px"}}>Page {currentPage} of {maxPage}</span>
                            <button onClick={handleNextPage} disabled={currentPage === maxPage}>
                                Next
                            </button>
                        </div>
                    </>
                ):(
                    <>
                        <div className="no-available-product">
                            No available product!
                        </div>
                    </>
                )}

            </div>

            <Footer/>
        </>
    )
}
export default ProductDisplay;