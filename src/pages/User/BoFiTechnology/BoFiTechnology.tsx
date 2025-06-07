import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

import bannerImg from "../../../assets/banners/BofiTechnologyBanner.png"
import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";

import "./BofiTechnology.css"

import BofiLogo1 from "../../../assets/bofi-technology/bofi-logo-1.png"
import BofiLogo2 from "../../../assets/bofi-technology/bofi-logo-2.png"
import BofiSlogan from "../../../assets/bofi-technology/bofi-slogan.png"
import BofiDemo from "../../../assets/bofi-technology/demonstration.png"
import Devbie from "../../../assets/bofi-technology/devbie.png"

const BoFiTechnology = () =>{
    return(
        <div>
            <Header/>

            <ShortBanner title={"Bofi Technology"} imgSrc={bannerImg}/>

            <div className="bofi-technology">
                <div className="img-container">
                    <img src={BofiLogo1} alt="bofi-logo-1" className="bofi-icon"/>
                </div>
                <div className="img-container">
                    <img src={BofiLogo2} alt="bofi-logo-2" className="bofi-icon"/>
                </div>
                <div className="img-container">
                    <img src={BofiSlogan} alt="bofi-slogan" className="slogan"/>
                </div>


                <div className="description-group">
                    <p className="description">
                        Anytime you do not know which size is suitable, <strong>Devbie - virtual assistant from BoFi </strong>
                        will appear and make <br/> your shopping trip more modern and smoother.
                    </p>
                    <p className="description">
                        Just with a 2D picture, BoFi can give you <strong>suitable size</strong> and even
                        which <strong>colors
                        fit with your skin tone</strong> or <br/> <strong>suggest styles</strong> you can try.
                    </p>

                    <p className="description">
                        It is proposed to try BoFi at [BRAND] offline stores for more accurate rate.
                    </p>
                </div>

                <div className="illustrations">
                    <img src={BofiDemo} alt="bofi-demo" className="bofi-demo"/>
                    <img src={Devbie} alt="devbie" className="devbie"/>
                </div>

            </div>

            <Footer/>
        </div>
    )
}
export default BoFiTechnology;