import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import SlidingBanner from "../../../components/SlidingBanner/SlidingBanner.tsx";
import ProductRecommend from "../../../components/ProductRecommend/ProductRecommend.tsx";

const HomePage = () =>{
    return(
        <div>
            <Header/>
            <SlidingBanner/>
            <ProductRecommend/>
            <Footer/>
        </div>
    )
}
export default HomePage;