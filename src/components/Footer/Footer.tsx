import Bofi from "../../assets/footer/bofi.png"
import StraDe from "../../assets/strade-icons/strade-1.png"
import Facebook from "../../assets/footer/facebook.png"
import Instagram from "../../assets/footer/instagram_icon.png"
import Youtube from "../../assets/footer/youtube.png"
import {motion} from "framer-motion";

import "./Footer.css"
import {useNavigate} from "react-router-dom";
const Footer = () =>{
    const navigate = useNavigate();
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="about">
                    <div className="about-strade">
                        <motion.img
                            className="strade-banner"
                            src={StraDe}
                            alt="strade-banner"
                            onClick={()=>{
                                navigate("/subscription")
                            }}

                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}

                            transition={{duration: 0.4, ease: "easeOut"}}
                            whileHover={{
                                scale: 1.02,
                                filter: "drop-shadow(0 0 70px rgba(255, 255, 255, 0.4))",
                                transition: { duration: 0.2 },
                            }}
                            style={{
                                borderRadius: "12px",
                                cursor: "pointer",
                            }}

                        />


                        <div className="strade-social-media">
                            <motion.a whileHover={{scale: 1.1}}

                                      href="https://www.facebook.com/profile.php?id=61576662721298" target="_blank"
                                      rel="noopener noreferrer">
                                <div className="icon-holder">
                                    <img className={"instagram-icon"} src={Instagram} alt={"instagram-icon"}/>
                                </div>
                            </motion.a>

                            <motion.a whileHover={{scale:1.1}} href="https://www.facebook.com/profile.php?id=61576662721298" target="_blank"
                               rel="noopener noreferrer">
                                <div className="icon-holder">
                                    <img className={"facebook-icon"} src={Facebook} alt={"facebook-icon"}/>
                                </div>
                            </motion.a>

                            <motion.a whileHover={{scale:1.1}} href="https://www.facebook.com/profile.php?id=61576662721298" target="_blank"
                               rel="noopener noreferrer">
                                <div className="icon-holder">
                                    <img className={"youtube-icon"} src={Youtube} alt={"youtube-icon"}/>
                                </div>
                            </motion.a>

                        </div>
                    </div>
                    <div className="about-bofi">
                        <div className="bofi-banner-container">
                            <a href={"/bofi"}>
                                <motion.img
                                    whileHover={{scale:1.05}}
                                    className={"bofi-banner"} src={Bofi} alt={"bofi-banner"}/>
                            </a>
                        </div>
                        <div className="bofi-description">
                            <h5>BOFI TECHNOLOGY:</h5>
                            <p>Choose your sizes with BoFi</p>
                            <p>Measurement History</p>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="hotline">
                        <h5>PURCHASE/SUPPORT:</h5>
                        <h4>085 8906 513</h4>
                    </div>

                    <div className="email">
                        <h5>EMAIL: </h5>
                        <p>stradetechnology@gmail.com</p>
                    </div>

                    <div className="extra-links">
                        <motion.a
                            whileHover={{scaleX: 1.05}}
                            href={"/privacy"}>Privacy & Policy</motion.a> <br/>
                        <motion.a
                            whileHover={{scaleX: 1.05}}
                            href={"#"} onClick={(e) => e.preventDefault()}>FAQ</motion.a> <br/>
                        <motion.a
                            whileHover={{scaleX: 1.05}}
                            href={"#"} onClick={(e) => e.preventDefault()}>Membership</motion.a> <br/>
                        <motion.a
                            whileHover={{scaleX: 1.05}}
                            href={"/warranty"}>Warranty & Return Policy</motion.a> <br/>
                    </div>

                </div>
                <div className="location">
                    <h5 className={"title"}>SHOP SYSTEM</h5>

                    <p className={"branch-name"}>Ho Chi Minh Branch:</p>
                    <p className={"store"}>Binh Tan District - Floor 1 TTTM Aeon Mall Bình Tân, No.1 Street <br/> 17A, Ward
                        Binh Tri Dong B.</p>
                    <p className={"store"}>Thu Duc City - District 9 - Floor 2 TTTM Vincom Mega Mall.</p>

                    <p className={"branch-name"}>Vinhomes Grand Park:</p>
                    <p className={"store"}>District 1 - 160 Nguyen Cu Trinh, Ward Nguyen Cu Trinh.</p>
                    <p className={"store"}>District 10 - 561 Su Van Hanh, Ward 13.</p>
                    <p className={"store"}>District 1 - The New Playground 26 Ly Tu Trong, Ben Nghe Ward.</p>

                    <p className={"branch-name"}>Vinhomes Grand Park:</p>
                    <p className={"store"}>District 1 - 160 Nguyen Cu Trinh, Ward Nguyen Cu Trinh.</p>
                    <p className={"store"}>District 10 - 561 Su Van Hanh, Ward 13.</p>
                    <p className={"store"}>District 1 - The New Playground 26 Ly Tu Trong, Ben Nghe Ward.</p>

                    <p className={"branch-name"}>Go Vap District - 326 Quang Trung, Ward 10.Bien Hoa Branch:</p>
                    <p className={"store"}>Bien Hoa City - 151A Phan Trung, Tan Mai Ward.</p>

                    <p className={"branch-name"}>Binh Duong Branch:</p>
                    <p className={"store"}>Thu Dau Mot City - 28 Yersin, Hiep Thanh Ward.Can Tho Branch</p>
                    <p className={"store"}>Ninh Kieu District - 52 Mau Than, An Phu Ward</p>

                    <p className={"branch-name"}>Ha Noi Branch:</p>
                    <p className={"store"}>Ha Dong District - Floor 2 TTTM Aeon Mall Ha Dong Hoang Van.</p>
                    <p className={"store"}>Thu Residential Area , Duong Noi WardHung Yen Branch:</p>
                    <p className={"store"}>Van Giang District - PT.TV 136 - Mega Grand World - Ocean Park</p>

                    <p className={"branch-name"}>Hai Phong Branch:</p>
                    <p className={"store"}>Le Chan District - Floor 2 TTTM Aeon Mall Hai Phong Le Chan 10</p>
                    <p className={"store"}>Vo Nguyen Giap, Kenh Duong Ward</p>
                </div>
            </div>
            <div style={{color: 'var(--bg-color)', height: '1px', width: '100%'}}></div>
            <p className={"copyright"}>Copyright © 2023 Dirty Coins Studio. Powered by StraDe</p>
        </div>
    )
}
export default Footer;