import React, {useEffect, useState} from "react";
import banner from "../../../../assets/activate-subscription/short-banner-subscription.png"
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
const API_CREATE_PAYMENT_LINK = "/payments/create-payment-link"; // your actual API endpoint

import "./ActivateDeepDive.css";
import {API_BASE_URL} from "../../../../config.ts";
import {WEB_URL} from "../../../../config.ts";
import Header from "../../../../components/Header/Header.tsx";
import ShortBanner from "../../../../components/ShortBanner/ShortBanner.tsx";
import Footer from "../../../../components/Footer/Footer.tsx";
import {useAuth} from "../../../../components/Authentication/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

const ActivateDeepDive = () => {

    const {token, user,loading} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!loading && user === null) {
            toast.warn("User must login in to use this function!");
            navigate("/login");
        }
    }, [user, loading, navigate]);
    const [formData, setFormData] = useState({
        buyer_name: "",
        buyer_email: "",
        buyer_phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const body = {
                ...formData,
                return_url: `${WEB_URL}/payment-info`,
                cancel_url: `${WEB_URL}/payment-info`
            };

            const response = await axios.post(
                `${API_BASE_URL}${API_CREATE_PAYMENT_LINK}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const result = response.data;

            if (result.error_code === 0) {
                const checkoutUrl = result.data?.checkout_url;
                if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                } else {
                    toast.error("Checkout URL not found.");
                }
            } else {
                toast.error(result.message || "Failed to create payment.");
            }

        } catch (error) {
            console.error("Payment error:", error);
            toast.error("An error occurred during payment.");
        }
    };

    return (
        <>
            <Header />
            <ShortBanner title="DEEP DIVE ACTIVATION" imgSrc={banner} />

            <div className="deep-dive-form-container">
                <h2>Activate Deep Dive</h2>
                <form className="deep-dive-form" onSubmit={handleSubmit}>
                    <label>
                        Full Name:
                        <input type="text" name="buyer_name" value={formData.buyer_name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="buyer_email" value={formData.buyer_email} onChange={handleChange} required />
                    </label>
                    <label>
                        Phone:
                        <input type="tel" name="buyer_phone" value={formData.buyer_phone} onChange={handleChange} required />
                    </label>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="submit"
                    >
                        Proceed to Payment
                    </motion.button>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default ActivateDeepDive;
