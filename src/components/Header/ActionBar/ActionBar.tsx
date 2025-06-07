import DirtyCoins from "../../../assets/actionbar-icons/dirty_coins.png"
import MapPin from "../../../assets/actionbar-icons/map_pin.png"
import Search from "../../../assets/actionbar-icons/search.png"
import Cart from "../../../assets/actionbar-icons/shopping_cart.png"
import Upload from "../../../assets/actionbar-icons/upload.png"
import User from "../../../assets/actionbar-icons/user.png"
import Line from "../../../assets/actionbar-icons/line.png"
import "./Actionbar.css"
import {motion} from "framer-motion";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
const ActionBar = () =>{
    const [query, setQuery] = useState("");

    const [usingEnglish, setUsingEnglish] = useState(true);

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("Searching for:", query);
    };

    const navigate = useNavigate();

    return(
        <>
            <div className="action-bar">
                <div className="left-action-bar">
                    <img className={"dirty-coin-img"} src={DirtyCoins} alt={"DirtyCoin"}
                         onClick={()=>{
                             navigate("/")
                         }}

                    />
                </div>

                <div className="right-action-bar"
                >
                    <motion.img className={"upload"} src={Upload} alt={"Upload"}
                    variants={{whileHover:{scale:1.1}}}
                                whileHover={"whileHover"}
                                onClick={()=>{
                                    navigate("/upload")
                                }}
                    />
                    <div className="search-bar">
                        <motion.img
                            className="search-icon"
                            src={Search}
                            alt="Search"
                            variants={{whileHover: {scale: 1.1}}}
                            whileHover="whileHover"
                        />
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder=""
                                className="search-input"
                                required
                            />

                        </form>
                    </div>
                    <motion.img className={"cart"} src={Cart} alt={"Cart    "}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                    />
                    <motion.img className={"user"} src={User} alt={"UserIcon"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                                onClick={()=>{
                                    navigate("/login")
                                }}
                    />
                    <motion.img className={"map"} src={MapPin} alt={"MapPin"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                                onClick={()=>{
                                    navigate("/contact")
                                }}
                    />
                    <div className="regions-group">
                        <motion.p
                            whileHover={{scale:1.1}}
                            className={`region ${usingEnglish ? "" : "chosen-region"}`}
                            onClick={()=>{setUsingEnglish(false)}}
                        >VI</motion.p>
                        <img className={"region-separate"} src={Line} alt={""}/>
                        <motion.p
                            whileHover={{scale:1.1}}
                            className={`region ${usingEnglish ? "chosen-region" : ""}`}
                            onClick={()=>{setUsingEnglish(true)}}
                        >EN</motion.p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActionBar;