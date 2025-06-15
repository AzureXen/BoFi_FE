import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import "./MeasuringOutcome.css"
import Devbie from "../../../assets/devbie-tilted.png"
import type {MeasurementData} from "../../../models/MeasurementData/MeasurementData.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import axios from "axios";

import {API_BASE_URL} from "../../../config.ts";
const API_SYNC_WISHLIST = "/measurements/sync-wishlist"


interface LocationState {
    measurementData: MeasurementData;
}

const MeasuringOutcome = () =>{

    const {token} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [measureData, setMeasureData] = useState<MeasurementData | null>(null);
    const location = useLocation();
    const state = location.state as LocationState;
    const navigate = useNavigate();
    useEffect(() => {
        if(!state?.measurementData){
            toast.warn("No measurement data found.");
        }
        else{
            setMeasureData(state.measurementData)
        }
    }, [state]);

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
            <Header/>
            <div className="measuring-outcome">
                <div className="devbie-container">
                    <img src={Devbie} alt="devbie" className="devbie"/>
                </div>
                <div className="measuring-result">
                    <div className="measurement">
                        <div className="measurement-section">
                            <h5 className={"measurement-title"}>UPPER BODY</h5>
                            <div className="random-line"></div>
                            <p>Height: {measureData?.height} cm</p>
                            <p>Head: {measureData?.["head circumference"]} cm</p>
                            <p>Neck: {measureData?.["neck circumference"]} cm</p>
                            <p>Shoulders: {measureData?.["shoulder breadth"]} cm</p>
                            <p>Chest: {measureData?.["chest circumference"]} cm</p>
                            <p>Waist: {measureData?.["waist circumference"]} cm</p>
                            <p>Arm length: {measureData?.["arm right length"]} cm</p>
                            <p>Bicep: {measureData?.["bicep right circumference"]} cm</p>
                            <p>Forearm: {measureData?.["forearm right circumference"]} cm</p>
                            <p>Wrist: {measureData?.["wrist right circumference"]} cm</p>
                        </div>

                        <div className="measurement-section">
                            <h5 className={"measurement-title"}>LOWER BODY</h5>
                            <div className="random-line"></div>
                            <p>Shoulder to crotch: {measureData?.["shoulder to crotch height"]} cm</p>
                            <p>Inside leg height: {measureData?.["inside leg height"]} cm</p>
                            <p>Hip: {measureData?.["hip circumference"]} cm</p>
                            <p>Thigh: {measureData?.["thigh left circumference"]} cm</p>
                            <p>Calf: {measureData?.["calf left circumference"]} cm</p>
                            <p>Ankle: {measureData?.["ankle left circumference"]} cm</p>
                        </div>
                    </div>

                    <div className="sync-size">
                        <p>Let DEVBIE help you sync this size chart with chosen items in Wishlist</p>
                        <motion.button
                            className="sync-button"
                            onClick={handleSyncSize}
                            disabled={isLoading}
                            whileHover={{scale: isLoading ? 1 : 1.03}}
                            whileTap={{scale: isLoading ? 1 : 0.98}}
                            transition={{type: "spring", stiffness: 300}}
                        >
                            {isLoading ? "Syncing..." : "Let's sync"}
                        </motion.button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default MeasuringOutcome