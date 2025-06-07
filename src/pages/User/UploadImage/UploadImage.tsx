import React from "react";
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

const UploadImage: React.FC = () => {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // Handle file drop here
        console.log("Files dropped:", event.dataTransfer.files);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
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
                        <div className="upload-guide">
                            <img src={UploadIcon} alt="upload-icon" className="upload-icon"/>
                            <p>Drag & drop or <strong><u>browse image</u></strong></p>
                        </div>
                        <p className={"upload-notice"}>All files are automatically deleted after 24 hours.</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{scale: 1.05}}
                    className="receive-sizes">Receive Sizes
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