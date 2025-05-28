import DirtyCoins from "../../../assets/actionbar-icons/dirty_coins.png"
import MapPin from "../../../assets/actionbar-icons/map_pin.png"
import Search from "../../../assets/actionbar-icons/search.png"
import Cart from "../../../assets/actionbar-icons/shopping_cart.png"
import Upload from "../../../assets/actionbar-icons/upload.png"
import User from "../../../assets/actionbar-icons/user.png"
import Line from "../../../assets/actionbar-icons/line.png"
import "./Actionbar.css"
import {motion} from "framer-motion";
const ActionBar = () =>{
    return(
        <>
            <div className="action-bar">
                <div className="left-action-bar">
                    <img className={"dirty-coin-img"} src={DirtyCoins} alt={"DirtyCoin"}/>
                </div>

                <div className="right-action-bar"
                >
                    <motion.img className={"upload"} src={Upload} alt={"Upload"}
                    variants={{whileHover:{scale:1.1}}}
                            whileHover={"whileHover"}
                    />
                    <div className={"search-bar"}>
                        <motion.img className={"search-icon"} src={Search} alt={"Search"}
                                    variants={{whileHover:{scale:1.1}}}
                            whileHover={"whileHover"}
                        />
                    </div>
                    <motion.img className={"cart"} src={Cart} alt={"Cart"}
                        variants={{whileHover:{scale:1.1}}}
                            whileHover={"whileHover"}
                    />
                    <motion.img className={"user"} src={User} alt={"User"}
                        variants={{whileHover:{scale:1.1}}}
                            whileHover={"whileHover"}
                    />
                    <motion.img className={"map"} src={MapPin} alt={"MapPin"}
                        variants={{whileHover:{scale:1.1}}}
                            whileHover={"whileHover"}
                    />
                    <div className="regions">
                        <p >VI</p> <img className={"region-separate"} src={Line} alt={""}/> <p className={"chosen-region"}>EN</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActionBar;