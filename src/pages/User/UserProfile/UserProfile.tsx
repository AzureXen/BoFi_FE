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

import {API_BASE_URL} from "../../../config.ts";
import UserProfileModel from "../../../models/UserProfile/UserProfileModel.ts";
import type {UserProfileFetched} from "../../../models/UserProfile/UserProfileFetched.ts";
const API_GET_USER_PROFILE = "/users/info";

import {motion} from "framer-motion";

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


// interface IUserProfileDetail{
//     firstName: string,
//     lastName: string,
//     email: string,
//     phone: string,
//     bio: string,
// }

const UserProfileDetail= ()=>{
    return(
        <>
            <h1>User Detail</h1>
        </>
    )
}

// const UserProfileDetail:React.FC<IUserProfileDetail> = ({firstName, lastName, email, phone, bio})=>{
//     return(
//         <>
//             <h1>User Detail</h1>
//         </>
//     )
// }

//
// interface ILogoutSection{
//     logout: ()=>void,
// }
// const LogoutSection:React.FC<ILogoutSection> = ({logout})=>{
//     return(
//         <>
//
//         </>
//     )
// }


const sideBarItems = [
    {itemName: "Account", itemIcon: UserIcon, itemValue: "account"},
    {itemName: "Log out", itemIcon: LogoutIcon, itemValue: "logout"}
]

const UserProfile = () =>{
    const [userProfile, setUserProfile] = useState<UserProfileModel>()

    const navigate = useNavigate();
    const { user, loading, token, logout } = useAuth();

    const [detailType, setDetailType] = useState("logout");

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
    },[user])

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
                                initial="rest"
                                animate="rest"
                                variants={{
                                    rest: {backgroundColor: "#EBEBEB", color:"var(--main-color-1)", transition: { duration: 0.3, ease: "easeInOut" }},
                                    hover: {backgroundColor: "var(--main-color-1)", color:"var(--main-color-2)", transition: { duration: 0.3, ease: "easeInOut" }}
                                }}
                                onClick={() => {
                                    setDetailType(item.itemValue);
                                }}
                                className="side-bar-item"
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
                                            hover: {scale: 1.1, transition: {type: "spring", stiffness: 300}}
                                        }}
                                    >
                                        {item.itemName}
                                    </motion.p>
                                </div>
                            </motion.div>

                        ))}
                    </div>

                    <div className="detail-display">
                        {(detailType === "account") && (
                            <>
                                <UserProfileDetail/>
                            </>
                        )}

                        {(detailType === "logout") && (
                            <>
                                <button
                                    onClick={logout}
                                >Logout
                                </button>
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