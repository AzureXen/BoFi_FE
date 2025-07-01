import "./ProductDetail.css"
import {motion} from "framer-motion";
import {API_BASE_URL} from "../../../config.ts";
import axios from "axios";
import ProductDetailModel from "../../../models/ProductDetail/ProductDetailModel.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {WishlistModel} from "../../../models/UserWishlist/WishlistModel.ts";

import { toast } from 'react-toastify';
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import ProductRecommend from "../../../components/ProductRecommend/ProductRecommend.tsx";

const API_GET_PRODUCT_BY_ID = "/products";

const API_ADD_TO_WISHLIST = "/users/wishlist"

const API_GET_RECOMMENDED_SIZE = "/measurements/pre-select-size"


const addToWishList = async (
    userToken: string,
    payload: { product_id: number; size_name: string; quantity: number }
): Promise<WishlistModel> => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_ADD_TO_WISHLIST}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data.error_code === 0) {
            return WishlistModel.fromApi(response.data.data);
        } else {
            toast.error(response.data.message || "Failed to add to wishlist");
            throw new Error(response.data.message || "Failed to add to wishlist");
        }
    } catch (error) {
        console.error("Error while adding to wishlist", error);
        throw error;
    }
};



const fetchProductById = async (productId: string): Promise<ProductDetailModel> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}${API_GET_PRODUCT_BY_ID}/${productId}`
        );

        return new ProductDetailModel(response.data.data);
    } catch (error) {
        console.error("Error while fetching products", error);
        throw error;
    }
};

const fetchRecommendSize = async (params: string, token: string)=>{
    try{
        const response = await axios.post(
            `${API_BASE_URL}${API_GET_RECOMMENDED_SIZE}?${params}`,
            {}, // empty POST body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.data;
    }catch(error){
        console.error("Error while fetching recommendSize", error);
        throw error;
    }
}

const ProductDetail =()=>{

    const navigate = useNavigate();
    const {token} = useAuth();
    // useEffect(() => {
    //     if (!loading && user === null) {
    //         navigate("/login");
    //     }
    // }, [user, loading, navigate]);

    const [productDetail, setProductDetail] = useState<ProductDetailModel>();


    const [recommendedSize, setRecommendedSize] = useState("");

    const { productId } = useParams();

    const [selectedSize, setSelectedSize] = useState("");

    // get recommended size
    useEffect(()=>{
        if(productDetail!=null && productDetail.size.length>0 && token!=null){
            const params = new URLSearchParams();
            params.append("product_id", productDetail?.product.productId.toString());
            try{
                const fetchRecommendedSize = async () =>{
                    const response = await fetchRecommendSize(params.toString(),token);
                    setRecommendedSize(response.size_name);
                }
                fetchRecommendedSize();
            }catch(error){
                console.error("Error while fetching recommended size", error);
                throw error;
            }
        }
    },[productDetail])

    useEffect(()=>{
        setSelectedSize(recommendedSize);
    },[recommendedSize])

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

    const handleWishlistButton = async () => {
        try {

            if (!token) {
                toast.warn("You need to log in to add this item to wishlist.");
                navigate("/login");
                return;
            }

            if (!productId) {
                toast.warn("Product not found!");
                return;
            }

            if (!selectedSize) {
                toast.warn("Please pick a size.");
                return;
            }

            const payload = {
                product_id: parseInt(productId),
                size_name: selectedSize,
                quantity: 1
            };

            const response = await addToWishList(token, payload);
            toast.success("Added to wishlist!");
            console.log("Added to wishlist:", response);
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };



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
                            onClick={()=>handleWishlistButton()}
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
                        {productDetail?.size.map((size) => {
                            const hoverStyle = {
                                scale: 1.06,
                                ...(recommendedSize === size
                                    ? {
                                        backgroundColor: "#ea5431",
                                        color: "#fff",
                                    }
                                    : {
                                        backgroundColor: "#333",
                                        color: "#fff",
                                    }),
                            };
                            return(

                                <div className="size-button-wrapper" key={size}>
                                    {recommendedSize === size && (
                                        <motion.div
                                            className="recommended-label"
                                            initial={{opacity: 0, y: -10, scale: 0.9}}
                                            animate={{
                                                opacity: 1,
                                                y: -4,
                                                scale: [1, 1.05, 1],
                                                color: "#ea5431",
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeOut",
                                                scale: {
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                },
                                            }}
                                        >
                                            Recommended Size
                                        </motion.div>

                                    )}

                                    <motion.button
                                        className={`
                                      size-button
                                      ${selectedSize === size ? "selected" : ""}
                                      ${recommendedSize === size ? "recommended-size" : ""}
                                    `}
                                        onClick={() => setSelectedSize(size)}
                                        whileHover={hoverStyle}
                                        whileTap={{
                                            scale: 0.95,
                                            rotate: -1,
                                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
                                        }}
                                        animate={{
                                            ...(selectedSize === size && {
                                                scale: 1.1,
                                                backgroundColor: "#1e1e1e",
                                                color: "#fff",
                                                border: "2px solid #1e1e1e",
                                            }),
                                            ...(recommendedSize === size && {
                                                border: "2px solid #ea5431",
                                                color: "#ea5431",
                                                fontWeight: 600,
                                            }),
                                            ...(selectedSize === size && recommendedSize === size && {
                                                backgroundColor: "#ea5431",
                                                color: "#fff",
                                                border: "2px solid #ea5431",
                                            }),
                                        }}
                                        transition={{
                                            scale: {type: "spring", stiffness: 400, damping: 22},
                                            backgroundColor: {duration: 0.2},
                                            color: {duration: 0.2},
                                            rotate: {duration: 0.1},
                                            boxShadow: {duration: 0.1},
                                            border: {duration: 0.2},
                                        }}
                                    >
                                        Size {size}
                                    </motion.button>
                                </div>


                            )
                        })}
                    </div>
                </div>
            </div>
            <ProductRecommend/>
            <Footer/>
        </>
    )
}
export default ProductDetail;