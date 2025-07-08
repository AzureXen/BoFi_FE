import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import banner from "../../../assets/activate-subscription/short-banner-subscription.png";
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";
import { motion } from "framer-motion";

import "./ActivateSubscription.css"


const ActivateSubscription = () => {
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


const plans = [
    {
        title: "CONNECT",
        value: "$0.00",
        description: [
            "3 times of access for an account",
            "Body figures by BoFi - our AI measurement tool",
        ],
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
    },
    {
        title: "DEEP DIVE",
        value: "$3.00",
        description: [
            "4 times of access for an account",
            "Ideal for testing how BoFi fits into your brand’s shopping experience",
        ],
    },
];


