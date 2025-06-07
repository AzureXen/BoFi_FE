import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import "./AboutDirtyCoins.css"

import AboutDirtyCoins1 from "../../../assets/about-dirtycoins/about-dirtycoins-1.png"
import AboutDirtyCoins2 from "../../../assets/about-dirtycoins/about-dirtycoins-2.png"
import AboutDirtyCoinsBanner from "../../../assets/about-dirtycoins/about-dirtycoins-shortbanner.png"
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";

const AboutDirtyCoins = () =>{
    return(
        <div>
            <Header/>

            <ShortBanner title={"About us"} imgSrc={AboutDirtyCoinsBanner}/>

            <div className="about-dirty-coins">
                <div className="img-container">
                    <img src={AboutDirtyCoins1} alt="about-dirty-coins-1"/>
                </div>

                <div className="img-container">
                    <img src={AboutDirtyCoins2} alt="about-dirty-coins-2"/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
export default AboutDirtyCoins;