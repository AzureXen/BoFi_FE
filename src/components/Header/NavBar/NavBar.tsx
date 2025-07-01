import {useNavigate} from "react-router-dom";
import AboutIcon from "../../../assets/navbar_icons/about.png"
import BofiIcon from "../../../assets/navbar_icons/bofi.png"
import CollabsIcon from "../../../assets/navbar_icons/collabs.png"
import ContactIcon from "../../../assets/navbar_icons/contact.png"
import ProductsIcon from "../../../assets/navbar_icons/products.png"
import HistoryIcon from "../../../assets/navbar_icons/purchase_history.png"
import WishlistIcon from "../../../assets/navbar_icons/wishlist.png"
import UserLoggedInIcon from "../../../assets/navbar_icons/user-logged-in.png"
import "./NavBar.css"
import {motion} from "framer-motion";
import {type ReactNode, useEffect, useState} from "react";

import {useAuth} from "../../Authentication/AuthProvider.tsx";
import ProductType from "../../../models/ProductType/ProductType.ts";
import axios from "axios";
import type {ProductTypeFetched} from "../../../models/ProductType/ProductTypeFetched.ts";
import {API_BASE_URL} from "../../../config.ts";




interface INavBarItem{
    showHeader : boolean;
    itemName: string;
    itemImgUrl: string;
    navPath: string;
    children?: ReactNode;
}
const NavBarItem:React.FC<INavBarItem> = ({showHeader, itemName, itemImgUrl, navPath, children}) =>{
    const navigate = useNavigate();
    const [isHoveringProduct, setIsHoveringProduct] = useState(false);
    useEffect(()=>{
        setIsHoveringProduct(false);
    },[])
    return(
        <>
            <motion.div className="navbar-item"
                        onHoverStart={() => setIsHoveringProduct(true)}
                        onHoverEnd={() => setIsHoveringProduct(false)}

                        onClick={()=>navigate(navPath)}
                        variants={{
                            onHover: {},}}
                        whileHover="onHover"
            >
                <motion.img
                    variants={{onHover: {scale:1.1}}}
                    src={itemImgUrl} className={"navbar-item-img"} alt="logo"
                />
                <motion.p className={"navbar-item-name"}
                    variants={{onHover: {fontWeight:"500"}}}
                >{itemName}</motion.p>
                {(isHoveringProduct&&showHeader) && (
                    <>
                        {children}
                    </>
                )}
            </motion.div>
        </>
    )
}


// PRODUCT TYPE FETCH (Product's drop down menu)
const GET_ALL_TYPE_API = "/categories";
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



const navItems = [
    // {itemName: "Products", itemImgUrl: ProductsIcon, navPath: "/"},
    {itemName: "Collab's", itemImgUrl: CollabsIcon, navPath: "/"},
    {itemName: "Wishlist", itemImgUrl: WishlistIcon, navPath: "/wishlist"},
    {itemName: "Purchase History", itemImgUrl: HistoryIcon, navPath: "/history"},
    {itemName: "About DirtyCoins", itemImgUrl: AboutIcon, navPath: "/dirtycoins"},
    {itemName: "BoFi Technology", itemImgUrl: BofiIcon, navPath: "/bofi"},
    {itemName: "Contact", itemImgUrl: ContactIcon, navPath: "/contact   "},
]

interface INavBar{
    showHeader : boolean;
}

const NavBar:React.FC<INavBar> = ({showHeader}) =>{
    const navigate = useNavigate();
    const { user } = useAuth();

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
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

    return (
        <>
            <div className="navbar">
                <NavBarItem showHeader={showHeader}
                    itemName={"Products"} itemImgUrl={ProductsIcon} navPath={"/products"}>
                    <div className="sub-nav">
                        {productTypes.map((product) => (
                            <motion.div
                                key={product.type_id}
                                variants={{hovering: {}}}
                                whileHover="hovering"
                                className="sub-nav-item"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent parent onClick
                                    navigate(`/products/${product.type_name}`);
                                }}
                            >
                                <motion.p variants={{hovering: {scale: 1.1}}}>{product.type_name}</motion.p>
                            </motion.div>
                        ))}
                    </div>
                </NavBarItem>

                {
                    navItems.map((item, index) => (
                        <NavBarItem
                            showHeader={showHeader}
                            key={index}
                            itemName={item.itemName}
                            itemImgUrl={item.itemImgUrl}
                            navPath={item.navPath}
                        />
                    ))
                }

                {user && (
                    <NavBarItem
                        showHeader={showHeader}
                        itemName={"My Account"}
                        itemImgUrl={UserLoggedInIcon}
                        navPath={"/profile"}
                    />
                )}
            </div>
        </>
    )
}
export default NavBar;