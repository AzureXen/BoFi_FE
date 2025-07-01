import "./ProductManagement.css"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {motion} from "framer-motion";
const ProductManager = () =>{
    return(
        <>
            <Header/>
            <div className="product-manager">
                <div style={{
                    backgroundColor: "black",
                    padding: "12px 23px",
                    margin: "20px",
                    fontWeight: "500",
                    fontSize: "1.5rem"
                }}>PRODUCT MANAGEMENT
                </div>

                <motion.div
                    className="option"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                    Add Products
                </motion.div>

                <motion.div
                    className="option"
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                    All Products
                </motion.div>
            </div>
            <Footer/>
        </>

    )
}

export default ProductManager;