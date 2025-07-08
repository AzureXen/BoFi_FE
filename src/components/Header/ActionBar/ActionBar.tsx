import StraDe from "../../../assets/strade-icons/strade-2.png"
import MapPin from "../../../assets/actionbar-icons/map_pin.png"
import Search from "../../../assets/actionbar-icons/search.png"
import Cart from "../../../assets/actionbar-icons/shopping_cart.png"
import Upload from "../../../assets/actionbar-icons/upload.png"
import User from "../../../assets/actionbar-icons/user.png"
import Line from "../../../assets/actionbar-icons/line.png"
import SubscriptionIcon from "../../../assets/actionbar-icons/subscription-icon.png"
import "./Actionbar.css"
import {motion, useAnimation} from "framer-motion";
import {useEffect, useState} from "react";
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
                    <StradeBanner/>


                    {/*<div className="staff-navigator"*/}
                    {/*onClick={()=>{*/}
                    {/*    navigate("/manage");*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*    STAFF ONLY*/}
                    {/*</div>*/}
                </div>

                <div className="right-action-bar"
                >
                    <motion.img className={"subscription"} src={SubscriptionIcon} alt={"Subscription"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                                onClick={() => {
                                    navigate("/subscription")
                                }}
                    />
                    <motion.img className={"upload"} src={Upload} alt={"Upload"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                                onClick={() => {
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
                    <motion.img className={"cart"} src={Cart} alt={"Cart"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                    />
                    <motion.img className={"user"} src={User} alt={"UserIcon"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                                onClick={() => {
                                    navigate("/profile")
                                }}
                    />
                    <motion.img className={"map"} src={MapPin} alt={"MapPin"}
                                variants={{whileHover: {scale: 1.1}}}
                                whileHover={"whileHover"}
                                onClick={() => {
                                    navigate("/contact")
                                }}
                    />
                    <div className="regions-group">
                        <motion.p
                            whileHover={{scale: 1.1}}
                            className={`region ${usingEnglish ? "" : "chosen-region"}`}
                            onClick={() => {
                                setUsingEnglish(false)
                            }}
                        >VI
                        </motion.p>
                        <img className={"region-separate"} src={Line} alt={""}/>
                        <motion.p
                            whileHover={{scale: 1.1}}
                            className={`region ${usingEnglish ? "chosen-region" : ""}`}
                            onClick={() => {
                                setUsingEnglish(true)
                            }}
                        >EN
                        </motion.p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActionBar;


const StradeBanner = () => {
    const controls = useAnimation();
    const navigate = useNavigate();

    useEffect(() => {
        controls.start({
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {duration: 0.6, ease: "easeOut"},
        }).then(() => {
            controls.start({
                scale: [1, 1.02, 0.98, 1],
                rotate: [0, 1.2, -1.2, 0],
                transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            });
        });
    }, [controls]);

    return (
        <motion.img
            className="strade-img"
            src={StraDe}
            alt="strade-banner"
            onClick={()=>{
                navigate("/");
            }}

            initial={{ opacity: 0, scale: 0.9 }}
            animate={controls}
            whileHover={{
                scale: 1.04,
                filter: "brightness(1.06) drop-shadow(0 0 8px rgba(255,255,255,0.25))",
                transition: { duration: 0.3 }
            }}
            whileTap={{
                scale: 0.94,
                rotate: -2,
                transition: { type: "spring", stiffness: 280 }
            }}
        />
    );
}