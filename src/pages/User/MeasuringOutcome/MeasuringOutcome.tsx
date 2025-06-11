import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import "./MeasuringOutcome.css"
import Devbie from "../../../assets/devbie-tilted.png"
const MeasuringOutcome = () =>{
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
                            <h5 className={"measurement-title"} >BODY FIGURES</h5>
                            <div className="random-line"></div>
                            <p>Leg length:</p>
                            <p>Shoulders:</p>
                            <p>Upper arms:</p>
                            <p>Chest:</p>
                            <p>Waist:</p>
                            <p>Hips:</p>
                            <p>Buttocks:</p>
                            <p>Thighs:</p>
                        </div>

                        <div className="measurement-section">
                            <h5 className={"measurement-title"}>CLOTHES SIZE</h5>
                            <div className="random-line"></div>
                            <p>T-shirt/Shirt:</p>
                            <p>Shorts:</p>
                            <p>Dress & Skirt:</p>
                            <p>Pants:</p>
                            <p>Cardigan:</p>
                            <p>Jacket:</p>
                            <p>Sweater:</p>
                            <p>Outerwear:</p>
                            <p>Underwear:</p>
                        </div>
                    </div>

                    <div className="sync-size">
                        <p>Let DEVBIE help you sync this size chart with chosen items in Wishlist</p>
                        <button className="sync-button">
                            Let's sync
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default MeasuringOutcome