import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import banner from "../../../assets/activate-subscription/short-banner-subscription.png";
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";
import { motion } from "framer-motion";
import {API_BASE_URL} from "../../../config.ts";
const API_ACTIVATE_FREE_TRIAL = "/users/activate-trial"
const API_ACTIVATE_DEEP_DIVE = "/users/activate-deep-dive"
import "./ActivateSubscription.css"
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import {toast} from "react-toastify";
import axios from "axios";


const ActivateSubscription = () => {
    const { user, token } = useAuth();

    const handleConnect = async () => {
        try {
            if (!token) {
                toast.error("Please log in to activate your free trial.");
                return;
            }

            const response = await axios.post(`${API_BASE_URL}${API_ACTIVATE_FREE_TRIAL}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = response.data;

            if (result.error_code === 0) {
                toast.success("Trial activated successfully!");
            } else {
                if(result.message!=null && result.message=="trial_already_activated"){
                    toast.error("You have already activated the free trial.");
                }
                else toast.error(result.message || "Failed to activate trial.");
            }

        } catch (error) {
            console.error("Activation error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleEnterprise = () => {
        toast.info("Please contact us to activate the Enterprise plan.");
    };

    const handleDeepDive = async () => {
        if (!user || !token) {
            toast.warn("You must be logged in to activate Deep Dive!");
            return;
        }

        try {
            const body = {
            };

            const response = await axios.post(`${API_BASE_URL}${API_ACTIVATE_DEEP_DIVE}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = response.data;

            if (result.error_code === 0) {
                const checkoutUrl = result.data?.checkoutUrl;
                if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                } else {
                    toast.error("No checkout URL found.");
                }
            } else {
                toast.error(result.message || "Could not create payment link.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("An error occurred while creating the payment link.");
        }
    };

    const plans = [
        {
            title: "CONNECT",
            value: "$0.00",
            description: [
                "3 times of access for an account",
                "Body figures by BoFi - our AI measurement tool",
            ],
            onClick: handleConnect,
        },
        {
            title: "ENTERPRISE",
            value: "$100.00/year",
            description: [
                "Contact with StraDe",
                "Live smart-fit recommendations on your website",
                "Data insights to optimize inventory and reduce returns",
                "Dedicated support for smooth deployment",
            ],
            onClick: handleEnterprise,
        },
        {
            title: "DEEP DIVE",
            value: "$3.00",
            description: [
                "4 times of access for an account",
                "Ideal for testing how BoFi fits into your brand’s shopping experience",
            ],
            onClick: handleDeepDive,
        },
    ];



    return (
        <>
            <Header />
            <ShortBanner imgSrc={banner} title={"SUBSCRIPTION"} />
            <div className="activate-subscription">
                {plans.map((plan, index) => (
                    <div className="subscription-option" key={index}>
                        <h4 className="subscription-title">{plan.title}</h4>
                        <h3 className="subscription-value">{plan.value}</h3>
                        <div className="subscription-content-divider"></div>
                        <div className="subscription-description">
                            {plan.description.map((line, idx) => (
                                <p key={idx}>• {line}</p>
                            ))}
                        </div>
                        <div className="activate-subscription-button">
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                transition={{type: "spring", stiffness: 300}}
                                onClick = {plan.onClick}
                            >
                                Activate
                            </motion.button>

                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    );
};

export default ActivateSubscription;







