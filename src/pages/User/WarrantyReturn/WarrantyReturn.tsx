import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

import "./WarrantyReturn.css"

const WarrantyReturn = () =>{
    return(
        <div>
            <Header/>
            <div className="warranty-return">
                <h5>Warranty & Return Policy</h5>

                <div className="huge-chunk-of-text-container">
                    <p>
                        Warranty Policy for each product type <br/>
                        For T-shirt products (T-shirt, Polo...): 6 months <br/>
                        For printed products: 6 months <br/>
                        For jacket products such as Varsity Jacket, Coach Jacket...: 3 months <br/>
                        For accessory products such as Backpack, Crossbody Bag, Slides, Sneakers...: 3 months <br/>
                        This warranty policy applies to products with manufacturer defects such as: color fading, peeling prints, faded prints, missing prints, defective zippers, defective drawstrings. <br/>
                    </p>

                    <p>
                        Cases that will not be covered by the warranty <br/>
                        - Using strong detergents on the product <br/>
                        - Ironing, drying at high temperatures <br/>
                        - Washing with other dark-colored products <br/>
                        - Products damaged by external factors: insects, creatures, storage process <br/>
                        - Products damaged by physical factors: collision, rubbing, strong rubbing... <br/>
                        Policy for Returning Purchased Products <br/>
                        DirtyCoins will not support the exchange of products that are part of SALE PROGRAMS OR PROMOTIONS and personal products (eg underwear). You can request to exchange the product within 10 (ten) days for orders purchased directly at the store and 15 (fifteen) days for orders purchased online. The costs related to returning the product to DirtyCoins will be paid by the customer. <br/>
                        DirtyCoins will only support product exchange 01 (one) time only; does not support returns and refunds for the product. The exchanged product must be of the same type, same price or higher price (customers will pay the difference. Customers will not be refunded if the face value of the new product is lower than the original product. <br/>
                        Regulations for exchanged products: <br/>
                        - No signs of dirt, strange smell or signs of use <br/>
                        - With invoice or purchase confirmation <br/>
                        - Full paper tags and fabric labels attached to the product <br/>
                        - Due to hygiene reasons, socks and underwear products will not support product exchange <br/>
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default WarrantyReturn;