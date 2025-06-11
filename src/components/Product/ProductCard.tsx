import "./ProductGrid.tsx"
import {useNavigate} from "react-router-dom";
interface productProps{
    productId: string;
    imgUrl: string,
    productName: string,
    productPrice: string,
}
const ProductCard:React.FC<productProps> = ({imgUrl, productName, productPrice, productId}) =>{
    const navigate = useNavigate();
    return(
        <div
            onClick={()=>navigate(`/products/detail/${productId}`)}
            className={"product"}>
            <div className="product-image-container">
                <img className={"product-image"} src={imgUrl} alt="productName"/>
            </div>
            <div className={"product-name"}>{productName}</div>
            <div className={"product-price"}>${productPrice}</div>
        </div>
    )
}
export default ProductCard