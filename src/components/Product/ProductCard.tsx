import "./ProductGrid.tsx"

interface productProps{
    imgUrl: string,
    productName: string,
    productPrice: string,
}
const ProductCard:React.FC<productProps> = ({imgUrl, productName, productPrice}) =>{
    return(
        <div className={"product"}>
            <img className={"product-image"} src={imgUrl} alt="productName"/>
            <p className={"product-name"}>{productName}</p>
            <p className={"product-price"}>${productPrice}</p>
        </div>
    )
}
export default ProductCard