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
import {type ReactNode, useState} from "react";

import {useAuth} from "../../Authentication/AuthProvider.tsx";

interface INavBarItem{
    itemName: string;
    itemImgUrl: string;
    navPath: string;
    children?: ReactNode;
}
const NavBarItem:React.FC<INavBarItem> = ({itemName, itemImgUrl, navPath, children}) =>{
    const navigate = useNavigate();
    const [isHoveringProduct, setIsHoveringProduct] = useState(false);
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
                {isHoveringProduct && (
                    <>
                        {children}
                    </>
                )}
            </motion.div>
        </>
    )
}

const navItems = [
    // {itemName: "Products", itemImgUrl: ProductsIcon, navPath: "/"},
    {itemName: "Collab's", itemImgUrl: CollabsIcon, navPath: "/"},
    {itemName: "Wishlist", itemImgUrl: WishlistIcon, navPath: "/"},
    {itemName: "Purchase History", itemImgUrl: HistoryIcon, navPath: "/"},
    {itemName: "About DirtyCoins", itemImgUrl: AboutIcon, navPath: "/dirtycoins"},
    {itemName: "BoFi Technology", itemImgUrl: BofiIcon, navPath: "/bofi"},
    {itemName: "Contact", itemImgUrl: ContactIcon, navPath: "/contact   "},
]
const NavBar = () =>{
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <>
            <div className="navbar">
                <NavBarItem
                    itemName={"Products"} itemImgUrl={ProductsIcon} navPath={"/products"}>
                    <div className="sub-nav">
                        <motion.div
                            variants={{hovering: {}}}
                            whileHover="hovering"
                            className="sub-nav-item"
                            onClick={()=>{
                                navigate("/products")
                            }}
                        >
                            <motion.p variants={{hovering: {scale: 1.1}}}>Tops</motion.p>
                        </motion.div>

                        <motion.div
                            variants={{hovering: {}}}
                            whileHover="hovering"
                            className="sub-nav-item"
                            onClick={()=>{
                                navigate("/products")
                            }}
                        >
                            <motion.p variants={{hovering: {scale: 1.1}}}>Bottoms</motion.p>
                        </motion.div>

                        <motion.div
                            variants={{hovering: {}}}
                            whileHover="hovering"
                            className="sub-nav-item"
                            onClick={()=>{
                                navigate("/products")
                            }}
                        >
                            <motion.p variants={{hovering: {scale: 1.1}}}>Accessories</motion.p>
                        </motion.div>

                        <motion.div
                            variants={{hovering: {}}}
                            whileHover="hovering"
                            className="sub-nav-item"
                            onClick={()=>{
                                navigate("/products")
                            }}
                        >
                            <motion.p variants={{hovering: {scale: 1.1}}}>Bags</motion.p>
                        </motion.div>

                        <motion.div
                            variants={{ hovering: {} }}
                            whileHover="hovering"
                            className="sub-nav-item"
                            onClick={()=>{
                                navigate("/products")
                            }}
                        >
                            <motion.p variants={{ hovering: { scale: 1.1 } }}>Women wears</motion.p>
                        </motion.div>

                        <motion.div
                            variants={{ hovering: {} }}
                            whileHover="hovering"
                            className="sub-nav-item"
                            onClick={()=>{
                                navigate("/products")
                            }}
                        >
                            <motion.p variants={{ hovering: { scale: 1.1 } }}>Combo</motion.p>
                        </motion.div>
                    </div>
                </NavBarItem>
                {
                    navItems.map((item, index) => (
                        <NavBarItem
                            key={index}
                            itemName={item.itemName}
                            itemImgUrl={item.itemImgUrl}
                            navPath={item.navPath}
                        />
                    ))
                }

                {user && (
                    <NavBarItem
                        itemName={"My Account"}
                        itemImgUrl={UserLoggedInIcon}
                        navPath={"/"}
                    />
                )}
            </div>
        </>
    )
}
export default NavBar;