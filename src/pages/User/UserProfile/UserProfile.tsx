import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import "./UserProfile.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";
import UserShortBanner from "../../../assets/user-profile/short-banner.png"
import UserIcon from "../../../assets/user-profile/account-icon.png"
import LogoutIcon from "../../../assets/user-profile/logout-icon.png"
import UserDefaultAvatar from "../../../assets/user-profile/user-avatar.png"

import axios from "axios";

import UserProfileModel from "../../../models/UserProfile/UserProfileModel.ts";
import type {UserProfileFetched} from "../../../models/UserProfile/UserProfileFetched.ts";

import {API_BASE_URL} from "../../../config.ts";
const API_GET_USER_PROFILE = "/users/info";
const API_GET_USER_MEASUREMENTS = "/users/measurements";
const API_SYNC_WISHLIST = "/measurements/sync-wishlist"

import {motion} from "framer-motion";
import type {MeasurementData} from "../../../models/MeasurementData/MeasurementData.ts";
import {toast} from "react-toastify";



const fetchUserProfile = async (userToken: string)=> {
    try{
        const response = await axios.get(`${API_BASE_URL}${API_GET_USER_PROFILE}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        const raw: UserProfileFetched = response.data.data;

        return new UserProfileModel(
            raw.id,
            raw.username,
            raw.email,
            raw.full_name,
            raw.phone,
            raw.address,
            raw.avatar,
            raw.role
        );
    }catch(error){
        console.error("Error while fetching user profile");
        console.error(error);
    }
}
const fetchUserMeasurements = async(token: string)=>{
    if (!token) {
        return;
    }
    try {

        const response = await axios.get(`${API_BASE_URL}${API_GET_USER_MEASUREMENTS}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;

    } catch (error) {
        console.error('Error analyzing image:', error);
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error(`Failed to fetch user measurement: ${errorMessage}`);
        } else {
            console.error("Failed to fetch user measurement. Please try again.");
        }
    }
}


interface IUserProfileDetail{
    fullName: string
    email: string,
    phone: string,
    address: string;
    token: string;
}

const UserProfileDetail:React.FC<IUserProfileDetail> = ({fullName, email, phone, address, token})=>{
    const userDetails = [
        { label: 'Full name', value: fullName },
        { label: 'Email Address', value: email },
        { label: 'Phone', value: phone },
        { label: 'Address', value: address },
    ];

    const [selectedTab, setSelectedTab] = useState<"Overview" | "BoFi">("Overview");

    const [measureData, setMeasureData] = useState<MeasurementData | null>(null);

    const [measurementDetails, setMeasurementDetails] = useState<{ label: string, value: number }[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!token) return;
        try{
            const fetchMeasurements = async ()=>{
                const response = await fetchUserMeasurements(token);
                if (response!=null){
                    setMeasureData(response);
                }
            }
            fetchMeasurements();
        }catch(error){
            console.log("UserProfileDetail/fetchMeasureDataUseEffect Error: ");
            console.log(error);
        }
    },[token])

    useEffect(()=>{
        if (measureData === null) return;

        console.log("found measure data:");
        console.log(measureData);

        const details = [];
        details.push({ label: "Ankle Left Circumference", value: measureData["ankle left circumference"] });
        console.log(measureData["ankle left circumference"]);
        details.push({ label: "Arm Right Length", value: measureData["arm right length"] });
        details.push({ label: "Bicep Right Circumference", value: measureData["bicep right circumference"] });
        details.push({ label: "Calf Left Circumference", value: measureData["calf left circumference"] });
        details.push({ label: "Chest Circumference", value: measureData["chest circumference"] });
        details.push({ label: "Forearm Right Circumference", value: measureData["forearm right circumference"] });
        details.push({ label: "Head Circumference", value: measureData["head circumference"] });
        details.push({ label: "Height", value: measureData["height"] });
        details.push({ label: "Hip Circumference", value: measureData["hip circumference"] });
        details.push({ label: "Inside Leg Height", value: measureData["inside leg height"] });
        details.push({ label: "Neck Circumference", value: measureData["neck circumference"] });
        details.push({ label: "Shoulder Breadth", value: measureData["shoulder breadth"] });
        details.push({ label: "Shoulder to Crotch Height", value: measureData["shoulder to crotch height"] });
        details.push({ label: "Thigh Left Circumference", value: measureData["thigh left circumference"] });
        details.push({ label: "Waist Circumference", value: measureData["waist circumference"] });
        details.push({ label: "Wrist Right Circumference", value: measureData["wrist right circumference"] });

        console.log("Finished details: ")
        console.log(details);
        setMeasurementDetails(details);
    },[measureData])


    const handleSyncSize = async () => {
        if (!measureData) {
            toast.error("No measurement data available to sync.");
            return;
        }

        if (!token) {
            toast.error("Authentication token not found. Please login again.");
            return;
        }

        setIsLoading(true);

        try {
            const requestBody = {
                shoulder_to_crotch_height: measureData["shoulder to crotch height"],
                inside_leg_height: measureData["inside leg height"],
                chest_circumference: measureData["chest circumference"],
                waist_circumference: measureData["waist circumference"],
                hip_circumference: measureData["hip circumference"]
            };

            const response = await axios.post(
                `${API_BASE_URL}${API_SYNC_WISHLIST}`,
                requestBody,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Size chart synced successfully!");
                navigate("/wishlist");
            }

        } catch (error) {
            console.error('Sync error:', error);

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Authentication failed. Please login again.");
                } else if (error.response?.status === 400) {
                    toast.error("Invalid measurement data. Please try again.");
                } else {
                    toast.error(`Sync failed: ${error.response?.data?.message || error.message}`);
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <>
            <div className="tab-bar">
                {["Overview", "BoFi"].map((tab) => (
                    <button
                        key={tab}
                        className="tab-button"
                        onClick={() => setSelectedTab(tab as "Overview" | "BoFi")}
                    >
                        <motion.h2
                            key={tab}
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            transition={{duration: 0.2}}
                        >
                            {tab}
                        </motion.h2>

                        {selectedTab === tab && (
                            <motion.div
                                layoutId="tab-underline"
                                className="tab-underline"
                                transition={{type: "spring", stiffness: 500, damping: 30}}
                            />
                        )}
                    </button>
                ))}
            </div>

            {selectedTab === "Overview" && (
                <>
                    <div className="user-field-list">
                        {userDetails.map((detail) => (
                            <div key={detail.label} className="user-field-container">
                                <div className="user-field-label">{detail.label}</div>
                                <div className="user-field-value">
                                    {(detail.value == "" || detail.value == null) ? "none" : detail.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.04 }}
                        style={{
                            width: "150px",
                            height: "35px",
                            display: "block",
                            borderRadius: "0px",
                            marginTop: "30px"
                        }}
                        onClick={() => {
                            console.log("Save changes button clicked!");
                        }}
                    >
                        Save changes
                    </motion.button>
                </>
            )}

            {selectedTab === "BoFi" && (
                <>
                    {measureData != null ? (
                        <div className="user-field-list">
                            {measurementDetails.map((detail) => (
                                <div key={detail.label} className="user-field-container">
                                    <div className="user-field-label">{detail.label}</div>
                                    <div className="user-field-value">
                                        {detail.value}
                                    </div>
                                </div>
                            ))}

                            <div style={{margin: "20px 10px"}}>
                                <motion.button
                                    className="sync-button"
                                    onClick={handleSyncSize}
                                    disabled={isLoading}
                                    whileHover={{scale: isLoading ? 1 : 1.03}}
                                    whileTap={{scale: isLoading ? 1 : 0.98}}
                                    transition={{type: "spring", stiffness: 300}}
                                >
                                    {isLoading ? "Syncing..." : "Sync Wishlist"}
                                </motion.button>
                                <motion.button
                                    className="sync-button"
                                    onClick={()=>{
                                        navigate("/upload");
                                    }}
                                    whileHover={{scale: isLoading ? 1 : 1.03}}
                                    whileTap={{scale: isLoading ? 1 : 0.98}}
                                    transition={{type: "spring", stiffness: 300}}
                                >
                                    {isLoading ? "Syncing..." : "New Measurements"}
                                </motion.button>

                            </div>

                        </div>

                    ) : (
                        <>
                            <h2>Measurement data not available.</h2>
                            <motion.button
                                style={{
                                    margin: "20px",
                                    padding: "10px",
                                    borderRadius: "0",
                                }}
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                onClick={()=>{
                                    navigate("/upload")
                                }}
                            >
                                Measure now!
                            </motion.button>
                        </>
                    )}
                </>
            )}


        </>
    )
}

const sideBarItems = [
    {itemName: "Account", itemIcon: UserIcon, itemValue: "account"},
    {itemName: "Log out", itemIcon: LogoutIcon, itemValue: "logout"}
]

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState<UserProfileModel>()

    const navigate = useNavigate();
    const {user, loading, token, logout} = useAuth();

    const [detailType, setDetailType] = useState("account");

    useEffect(()=>{
        if(!loading && token != null){
            const getUserProfile = async ()=>{
                try{
                    const response = await fetchUserProfile(token);
                    setUserProfile(response);
                }catch (error){
                    console.error("Error while fetching user profile", error);
                }
            }
            getUserProfile();
        }
    },[token, loading])

    useEffect(() => {
        if (!loading && user === null) {
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div style={{color: "black"}}>Loading...</div>;
    }

    return (
        <>
            <Header/>
            <ShortBanner title={"ACCOUNT"} imgSrc={UserShortBanner}/>
            <div className="user-profile">
                <div className="user-info-main">
                    <div className="user-avatar-container">
                        <div className="avatar-frame">
                            <img src={UserDefaultAvatar} alt="user-avatar" className="user-avatar"/>
                        </div>
                    </div>
                    <div className="user-name-container">
                        {userProfile?.name}
                    </div>
                </div>

                <div className="user-info-detail">
                    <div className="side-bar">
                        {sideBarItems.map((item, index) => (
                            <motion.div
                                whileHover="hover"
                                whileTap="tap"
                                initial="rest"
                                // animate="rest"
                                variants={{
                                    rest: {transition: { duration: 0.3, ease: "easeInOut" }},
                                    hover: {transition: { duration: 0.3, ease: "easeInOut" }},
                                    tap: {transition: { duration: 0.3, ease: "easeInOut" }}
                                }}
                                onClick={() => {
                                    setDetailType(item.itemValue);
                                }}
                                className={`side-bar-item ${detailType == item.itemValue ? "active-side-bar-item" : ""}`}
                                key={index}
                            >
                                <div className="icon-container">
                                    {/* Icon's color must be inverted when it's selected */}
                                    {/* <img src={} alt="item-icon" className="item-icon" /> */}
                                </div>
                                <div className="icon-title">
                                    <motion.p
                                        variants={{
                                            rest: {scale: 1, transition: {type: "spring", stiffness: 300}},
                                            hover: {scale: 1.1, transition: {type: "spring", stiffness: 300}},
                                            tap: {scale: 0.97, transition: {type: "spring", stiffness: 300}}
                                        }}
                                    >
                                        {item.itemName}
                                    </motion.p>
                                </div>
                            </motion.div>

                        ))}
                    </div>

                    <div className="detail-display">
                        {(detailType === "account" && userProfile && token!=null) && (
                            <>
                                <UserProfileDetail email={userProfile.email.toString()}
                                                   fullName={userProfile.full_name}
                                                   address={userProfile.address}
                                                   phone={userProfile.phone}
                                                   token={token}
                                />
                            </>
                        )}

                        {(detailType === "logout") && (
                            <>
                                <motion.button
                                    whileTap={{scale: 0.95}}
                                    whileHover={{scale: 1.04}}
                                    style={{width:"100px",margin:"20px", height:"35px"}}
                                    onClick={logout}
                                >Logout
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default UserProfile;