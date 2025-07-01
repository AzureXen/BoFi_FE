import ShortBanner from "../../../components/ShortBanner/ShortBanner.tsx";
import PurchaseHistoryBanner from "../../../assets/user-profile/short-banner.png"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

import "./PurchaseHistory.css"

const PurchaseHistory = () =>{
    return(
        <>
            <Header/>
            <ShortBanner title={"PURCHASE HISTORY"} imgSrc={PurchaseHistoryBanner}/>
            <div className="purchase-history">
                <div className={"random-line"}></div>
            </div>
            <Footer/>
        </>
    )
}

export default PurchaseHistory;