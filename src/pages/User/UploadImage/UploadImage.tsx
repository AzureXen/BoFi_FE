import React, {useEffect, useState, useRef} from "react";
import "./UploadImage.css";

import BoFiIcon1 from "../../../assets/bofi-technology/bofi-logo-1.png"
import BoFiIcon2 from "../../../assets/bofi-technology/bofi-logo-2.png"
import Slogan from "../../../assets/bofi-technology/bofi-slogan.png"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

import UploadIcon from "../../../assets/UploadImage/upload-image-icon.png"

import uploadShortBanner from "../../../assets/UploadImage/upload-image-short-banner.png"
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";

import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
import {toast} from "react-toastify";

import {API_BASE_URL} from "../../../config.ts";
const API_GET_TRIAL_TIMES = "/users/trial-time";
import axios from "axios";
const API_BODY_MEASUREMENT = "/measurements/measure-body";

const UploadImage: React.FC = () => {
    const [trialTimes, setTrialTimes] = useState(0);

    const navigate = useNavigate();
    const { user, loading, token} = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchTrialTime = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`${API_BASE_URL}${API_GET_TRIAL_TIMES}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const trial = response.data?.data?.trial_time ?? 0;
                setTrialTimes(trial);

            } catch (error) {
                console.error("Failed to fetch trial time:", error);
                toast.error("Failed to load trial time.");
            }
        };

        fetchTrialTime();
    }, [token]);


    useEffect(() => {
        if (!loading && user === null) {
            toast.warn("User must login in to use this function!");
            navigate("/login");
        }
    }, [user, loading, navigate]);

    const handleImageUpload = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setUploadedImage(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Please upload a valid image file.");
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleImageUpload(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleReceiveSizes = async () => {
        if (!uploadedImage) {
            toast.error("Please upload an image first!");
            return;
        }

        if (!token) {
            toast.error("Authentication token not found!");
            return;
        }

        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append('file', uploadedImage);

            const response = await axios.post(`${API_BASE_URL}${API_BODY_MEASUREMENT}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { error_code, message, data } = response.data;

            if (error_code !== 0 || !data) {
                throw new Error(message || "Unknown error during size analysis.");
            }

            toast.success("Size analysis completed!");
            console.log('Analysis result:', data);

            navigate('/measure', {
                state: {
                    measurementData: data,
                }
            });

        } catch (error) {
            console.error('Error analyzing image:', error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(`Failed to analyze image: ${errorMessage}`);
            } else {
                toast.error("Failed to analyze image. Please try again.");
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const removeImage = () => {
        setUploadedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <Header/>

            <ShortBanner title={"Measurement"} imgSrc={uploadShortBanner}/>

            <div className="upload-image">
                <div className="upload-area-container">
                    <div
                        className="upload-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <div className="upload-trial-info">
                            You have {trialTimes} trial{trialTimes === 1 ? "" : "s"} left
                        </div>

                        {imagePreview ? (
                            <div className="image-preview-container">
                                <img
                                    src={imagePreview}
                                    alt="Uploaded preview"
                                    className="uploaded-image-preview"
                                />
                                <button
                                    onClick={removeImage}
                                    className="remove-image-btn"
                                    type="button"
                                >
                                    ×
                                </button>
                            </div>
                        ) : (
                            <div className="upload-guide">
                                <img src={UploadIcon} alt="upload-icon" className="upload-icon"/>
                                <p>
                                    Drag & drop or{" "}
                                    <strong>
                                        <motion.u
                                            onClick={handleBrowseClick}
                                            style={{cursor: 'pointer', display: 'inline-block'}}
                                            whileHover={{scale: 1.03}}
                                            whileTap={{scale: 0.97}}
                                            transition={{type: "spring", stiffness: 300}}
                                        >
                                            browse image
                                        </motion.u>

                                    </strong>
                                </p>
                            </div>
                        )}
                        <p className={"upload-notice"}>All files are automatically deleted after 24 hours.</p>


                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            style={{display: 'none'}}
                        />
                    </div>
                </div>


                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{ scale: 0.95 }}
                    className="receive-sizes"
                    onClick={handleReceiveSizes}
                    disabled={!uploadedImage || isProcessing}
                >
                    {isProcessing ? "Processing..." : "Receive Sizes"}
                </motion.button>

                <div className="divider">

                </div>
                <div className="extra-information">
                    <div className="img-container">
                        <img src={BoFiIcon1} alt="BoFi Logo" className="bofi-icon"/>
                    </div>
                    <div className="img-container">
                        <img src={BoFiIcon2} alt="BoFi Logo" className="bofi-icon"/>
                    </div>
                    <div className="img-container">
                        <img src={Slogan} alt="BoFi Logo" className="slogan"/>
                    </div>

                    <div className="description-group">
                        <p className="description">
                            Anytime you do not know which size is suitable, <strong><i>Devbie - virtual assistant from BoFi</i></strong> will
                            appear and make <br/>your shopping trip more modern and smoother.
                        </p>
                        <p className="description">
                            Just with a 2D picture, <strong><i>BoFi</i></strong> can give you suitable size and even
                            which <strong><i>colors fit your skin tone</i></strong> or <br/> <strong><i>suggest styles you can try.</i></strong>
                        </p>
                        <p className="description">
                            It is <strong><i>proposed</i></strong> to
                            try <strong><i>BoFi</i></strong> at <strong><i>DirtyCoins offline stores</i></strong> for more accurate rate.
                        </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default UploadImage;