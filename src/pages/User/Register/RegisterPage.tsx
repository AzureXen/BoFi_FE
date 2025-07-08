import React, { useState } from "react";
import "./RegisterPage.css";
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import userIcon from "../../../assets/login-page/user-icon.png";
import passwordIcon from "../../../assets/login-page/password-icon.png";
import showPasswordIcon from "../../../assets/login-page/show-password.png";
import hidePasswordIcon from "../../../assets/login-page/hide-password.png";
import emailIcon from "../../../assets/login-page/reg-email.png"
import nameIcon from "../../../assets/login-page/user-icon.png";
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";

const RegisterPage = () => {
    const navigate = useNavigate();
    const {register, loading} = useAuth();
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        full_name: "",
        role: "customer",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();

        if (errors.length > 0) {
            errors.forEach(err => toast.error(err));
            return;
        }




        const { email, username, password, full_name, role } = {
            ...form,
            email: form.email.trim(),
            username: form.username.trim(),
            password: form.password.trim(),
            full_name: form.full_name.trim(),
        };
        const result = await register(email, username, password, full_name, role);

        if (result.success) {
            toast.success("Registered successfully!");
            navigate("/");
        } else {
            toast.error(`${result.error || "Registration failed"}`);
        }
    };

    const validateForm = () => {
        const errors: string[] = [];

        if (!form.full_name.trim()) {
            errors.push("Full name is required.");
        }

        if (!form.email.includes("@")) {
            errors.push("Email is invalid.");
        }

        if (form.username.trim().length < 3) {
            errors.push("Username must be at least 3 characters.");
        }

        const password = form.password;

        if (password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one number.");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errors.push("Password must contain at least one special character (!@#$%^&*).");
        }

        return errors;
    };


    return (
        <>
            <Header />
            <div className="register-page">
                <div className="register-form">
                    <h2>Create Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="register-input">
                            <img className="register-input-icon" src={nameIcon} alt="Full Name" />
                            <div className="register-input-box">
                                <input
                                    type="text"
                                    name="full_name"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="full_name">Full Name</label>
                            </div>
                        </div>

                        <div className="register-input">
                            <img className="register-input-icon" src={emailIcon} alt="Email" />
                            <div className="register-input-box">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>

                        <div className="register-input">
                            <img className="register-input-icon" src={userIcon} alt="Username" />
                            <div className="register-input-box">
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>

                        <div className="register-input">
                            <img className="register-input-icon" src={passwordIcon} alt="Password" />
                            <div className="register-input-box">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <motion.img
                                src={showPassword ? showPasswordIcon : hidePasswordIcon}
                                onClick={togglePassword}
                                alt="Toggle Password"
                                className="showHidePassword"
                                whileHover={{
                                    scale: 1.03,
                                    rotate: 10,
                                    filter: "brightness(1.2)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 1}}
                            className="register-button"
                        >
                            {loading ? "Registering..." : "Register"}
                        </motion.button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default RegisterPage;
