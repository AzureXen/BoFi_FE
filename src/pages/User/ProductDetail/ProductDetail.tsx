import "./ProductDetail.css"
import {motion} from "framer-motion";
import {API_BASE_URL} from "../../../config.ts";
import axios from "axios";
import ProductDetailModel from "../../../models/ProductDetail/ProductDetailModel.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
const API_GET_PRODUCT_BY_ID = "/products";

const fetchProductById = async (productId: string): Promise<ProductDetailModel> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_GET_PRODUCT_BY_ID}/${productId}`
        );

        console.log("fetch product by id response: ");
        console.log(response);

        return new ProductDetailModel(response.data.data);
    } catch (error) {
        console.error("Error while fetching products", error);
        throw error;
    }
};


const ProductDetail =()=>{

    const [productDetail, setProductDetail] = useState<ProductDetailModel>();

    const { productId } = useParams();

    const [selectedSize, setSelectedSize] = useState("");

    useEffect(()=>{
        const fetchProduct = async (productId: string)=>{
            try{
                const data = await fetchProductById(productId);
                setProductDetail(data);
            }catch(error){
                console.error("Error while fetching product detail");
                console.error(error);
            }
        }
        const productIdChecked = (productId!=null) ? productId : "";
        if(productId!=null){
            fetchProduct(productIdChecked);
        }else{
            console.log("waiting for productId")
        }
    },[productId]);

    useEffect(()=>{
        console.log("Fetched product: ");
        console.log(productDetail);
    },[productDetail])

    const addToWishList = ()=>{

    }

    return(
        <>
            <Header/>
            <div className="product-detail">
                <div className="product-images-container">
                    <img src={productDetail?.product.productImageUrl} alt="product-image" className="product-image"/>
                </div>
                <div className="product-info">
                    <div className="product-name">
                        {productDetail?.product.productName}
                    </div>
                    <div className="product-price">
                        ${productDetail?.product.productPrice}
                    </div>
                    <div className="product-description">
                        {productDetail?.product.productDescription}
                    </div>
                    <div className="add-to-wishlist-container">
                        <motion.button
                            className="add-to-wishlist"
                            onClick={()=>addToWishList()}
                            whileHover={{
                                scale: 1.03,
                                backgroundColor: "#cfcfcf",
                                letterSpacing: "1px",
                            }}
                            whileTap={{
                                scale: 0.96,
                                backgroundColor: "#bbb",
                                transition: {duration: 0.1},
                            }}
                            transition={{
                                scale: {type: "spring", stiffness: 350, damping: 20},
                                backgroundColor: {duration: 0.2},
                                letterSpacing: {duration: 0.3},
                            }}
                        >
                            Add to wishlist
                        </motion.button>

                    </div>
                    <div className="size-selection">
                        {productDetail?.size.map((size) => (
                            <motion.button
                                key={size}
                                className={`size-button ${selectedSize === size ? "selected" : ""}`}
                                onClick={() => setSelectedSize(size)}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#333",
                                    color: "#fff",
                                }}
                                whileTap={{
                                    scale: 0.95,
                                    rotate: -1,
                                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
                                }}
                                animate={selectedSize === size ? {
                                    scale: 1.1,
                                    backgroundColor: "#222",
                                    color: "#fff"
                                } : {}}
                                transition={{
                                    scale: {type: "spring", stiffness: 400, damping: 20},
                                    backgroundColor: {duration: 0.2},
                                    color: {duration: 0.2},
                                    rotate: {duration: 0.1},
                                    boxShadow: {duration: 0.1},
                                }}
                            >
                                Size {size}
                            </motion.button>

                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default ProductDetail;