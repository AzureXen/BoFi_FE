import React, {useEffect, useState} from "react";
import "./LoginPage.css";
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {motion} from "framer-motion";

import dirtyCoins from "../../../assets/login-page/dirty-coins.png"
import hidePasswordIcon from "../../../assets/login-page/hide-password.png"
import showPasswordIcon from "../../../assets/login-page/show-password.png"
import passwordIcon from "../../../assets/login-page/password-icon.png"

import regEmailSVG from "../../../assets/login-page/SVGs/reg-email.svg"
import regFacebookSVG from "../../../assets/login-page/SVGs/reg-facebook.svg"
import regTwitterSVG from "../../../assets/login-page/SVGs/reg-twitter.svg"

import userIcon from "../../../assets/login-page/user-icon.png"

import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage = () => {
    const { login, user } = useAuth();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    function togglePassword() {
        setShowPassword(prev => !prev);
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login(username, password);

            if (result.success) {
                toast.success("Login Success!");
                console.log("Login Success!");
                navigate("/");
            } else {
                toast.error("Login Failed!");
                console.error("Login failed.");
                console.error(result.error);
            }
        } catch (error: unknown) {
            console.error("LoginPage: Error while logging in");
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
            console.log("User already logged in. Navigating back to homepage.");
        }
    }, [user, navigate]);

    return (
        <div>
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
                            <img className="login-input-icon" src={passwordIcon} alt="Password Icon"/>
                            <div className="login-input-box">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <motion.img src={showPassword ? showPasswordIcon : hidePasswordIcon}
                                 onClick={() => {
                                     togglePassword();
                                 }}
                                 alt="show/hide icon"
                                 className="showHidePassword"
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 10,
                                            filter: 'brightness(1.2)',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </div>
                        <p className={"forgot-password"}>Forgot Password?</p>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 1}}
                            type="submit">Login
                        </motion.button>
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
        </div>
    );
}

export default LoginPage;