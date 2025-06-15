import "./UserWishlist.css"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ShortBannerImg from "../../../assets/user-wishlist/short-banner-wishlist.png"
import Devbie from "../../../assets/user-wishlist/devbie.png"
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";
import type {PagingInfo} from "../../../models/PagingInfo.ts";
import {API_BASE_URL} from "../../../config.ts";
import {WishlistModel, type WishlistResponse} from "../../../models/UserWishlist/WishlistModel.ts";
import type {WishlistModelFetched} from "../../../models/UserWishlist/WishlistModelFetched.ts";
import axios from "axios";
const GET_WISHLIST = "/users/wishlist"

import {motion} from "framer-motion";
import {toast} from "react-toastify";

const fetchWishlist = async (userToken: string):Promise<WishlistResponse>  => {
    const response = await axios.get<{ data: { items: WishlistModelFetched[]; paging: PagingInfo } }>(
        `${API_BASE_URL}${GET_WISHLIST}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }
    );
    const items = response.data.data.items.map(WishlistModel.fromApi);
    const paging = response.data.data.paging;

    return{
        items,
        paging
    }

};

const UserWishlist = ()=>{
    const navigate= useNavigate();
    const [wishlist, setWishlist] = useState<WishlistModel[]>([]);
    // const [maxPage, setMaxPage] = useState(1);

    const {user,loading, token} = useAuth();
    useEffect(() => {
        if (!loading && user === null) {
            toast.warn("User must login in to use this function!");
            navigate("/login");
        }
    }, [user, loading, navigate]);

    useEffect(()=>{
        const getWishlist = async ()=>{
            try{
                if(user!=null && token!=null){
                    const response = await fetchWishlist(token);
                    setWishlist(response.items);
                    // setMaxPage(response.paging.total_pages);
                }
            }catch(Error){
                console.error("Error while fetching wishlist");
                console.error(Error);
            }
        }
        getWishlist();
    },[user])

    return(
        <>
            <Header/>

            <div className="user-wishlist">

                <ShortBanner title={"Wishlist"} imgSrc={ShortBannerImg}/>

                <div className="wishlist-items-container">
                    {(wishlist && wishlist.length > 0) ?
                        (
                            <>
                                {wishlist.map((item,index) =>(
                                    <div className="wishlist-item" key={index}>
                                        <div className="image-container">
                                            <img src={item.mainImageUrl} alt="item-image" className="image"/>
                                        </div>

                                        <div className="item-name item-field">
                                            {item.name}
                                        </div>

                                        <div className="item-size item-field">
                                            {item.sizeName}
                                        </div>

                                        <div className="item-price item-field">
                                            ${item.price}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )
                        :
                        (<h2>Your wishlist is empty!</h2>)}
                </div>
                <div style={{display:"flex", justifyContent: "center", alignItems:"center", flexDirection:"column"}}>
                    <motion.button
                        onClick={() => navigate("/upload")}
                        className="measure-button"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.2}}
                    >
                        Start Measuring
                    </motion.button>
                    <p className={"measure-desc"}
                    >Receive more accuracy free body figures and clothes sizes at DIRTYCOINS offline stores.</p>
                    <img src={Devbie} alt="devbie" className="devbie"/>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default UserWishlist