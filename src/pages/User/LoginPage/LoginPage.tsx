import React, { useState } from "react";
import "./LoginPage.css";
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {motion} from "framer-motion";

import dirtyCoins from "../../../assets/login-page/dirty-coins.png"
// import hidePassword from "../../../assets/login-page/hide-password.png"
// import showPassword from "../../../assets/login-page/show-password.png"
import passwordIcon from "../../../assets/login-page/password-icon.png"
// import regEmail from "../../../assets/login-page/reg-email.png"
// import regFacebook from "../../../assets/login-page/reg-facebook.png"
// import regTwitter from "../../../assets/login-page/reg-twitter.png"

import regEmailSVG from "../../../assets/login-page/SVGs/reg-email.svg"
import regFacebookSVG from "../../../assets/login-page/SVGs/reg-facebook.svg"
import regTwitterSVG from "../../../assets/login-page/SVGs/reg-twitter.svg"

import userIcon from "../../../assets/login-page/user-icon.png"

const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <>
            <Header />
            <div className="login-page">
                <div className="icon-display">
                    <div className="icon-holder">
                        <img className="dirty-coin" src={dirtyCoins} alt="Dirty Coins" />
                    </div>
                </div>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="login-input">
                            <img className="login-input-icon" src={userIcon} alt="User Icon" />
                            <div className="login-input-box">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="username">UserName</label>
                            </div>
                        </div>
                        <div className="login-input">
                            <img className="login-input-icon" src={passwordIcon} alt="Password Icon" />
                            <div className="login-input-box">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <p className={"forgot-password"}>Forgot Password?</p>
                        <motion.button
                            whileHover={{scale:1.05}}
                            whileTap={{scale:1}}
                            type="submit">Login</motion.button>
                    </form>
                </div>
                <div className="register-options">
                    <h2>or New Membership with</h2>
                    <div className="register-icon-group">
                        <motion.div
                            whileHover={{scale:1.05, backgroundColor:"#F9A825"}}
                            className="register-icon-holder" id={"gmail"}>
                            <img src={regEmailSVG} alt="email-icon" className="register-icon"/>
                        </motion.div>
                        <motion.div
                            whileHover={{scale:1.05, backgroundColor:"#1877F2"}}
                            className="register-icon-holder" id={"facebook"}>
                            <img src={regFacebookSVG} alt="facebook-icon" className="register-icon"/>
                        </motion.div>
                        <motion.div
                            whileHover={{scale:1.05, backgroundColor:"#08a0e9", color:"white"}}
                            className="register-icon-holder" id={"twitter"}>
                            <motion.img src={regTwitterSVG} alt="twitter-icon" className="register-icon"/>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default LoginPage;