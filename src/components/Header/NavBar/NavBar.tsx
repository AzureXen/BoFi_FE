import {useNavigate} from "react-router-dom";
import AboutIcon from "../../../assets/navbar_icons/about.png"
import BofiIcon from "../../../assets/navbar_icons/bofi.png"
import CollabsIcon from "../../../assets/navbar_icons/collabs.png"
import ContactIcon from "../../../assets/navbar_icons/contact.png"
import ProductsIcon from "../../../assets/navbar_icons/products.png"
import HistoryIcon from "../../../assets/navbar_icons/purchase_history.png"
import WishlistIcon from "../../../assets/navbar_icons/wishlist.png"
import "./NavBar.css"
import {motion} from "framer-motion";
interface INavBarItem{
    itemName: string;
    itemImgUrl: string;
    navPath: string;
}
const NavBarItem:React.FC<INavBarItem> = ({itemName, itemImgUrl, navPath}) =>{
    const navigate = useNavigate();
    return(
        <>
            <motion.div className="navbar-item" onClick={()=>navigate(navPath)}
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
            </motion.div>
        </>
    )
}

const navItems = [
    {itemName: "Products", itemImgUrl: ProductsIcon, navPath: "/"},
    {itemName: "Collab's", itemImgUrl: CollabsIcon, navPath: "/"},
    {itemName: "Wishlist", itemImgUrl: WishlistIcon, navPath: "/"},
    {itemName: "Purchase History", itemImgUrl: HistoryIcon, navPath: "/"},
    {itemName: "About DirtyCoins", itemImgUrl: AboutIcon, navPath: "/"},
    {itemName: "BoFi Technology", itemImgUrl: BofiIcon, navPath: "/"},
    {itemName: "Contact", itemImgUrl: ContactIcon, navPath: "/"},
]
const NavBar = () =>{
    return (
        <>
            <div className="navbar">
                {
                    navItems.map((item, index) =>(
                        <NavBarItem
                            key={index}
                            itemName={item.itemName}
                            itemImgUrl={item.itemImgUrl}
                            navPath={item.navPath}
                        />
                    ))
                }
            </div>
        </>
    )
}
export default NavBar;