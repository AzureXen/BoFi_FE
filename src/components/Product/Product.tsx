

interface productProps{
    imgUrl: string,
    productName: string,
    productPrice: number,
}
const Product:React.FC<productProps> = ({imgUrl, productName, productPrice}) =>{
    return(
        <div className={"Product"}>
            <img className={"product-image"} src={imgUrl} alt="productName"/>
            <p className={"product-name"}>${productName}</p>
            <p className={"product-price"}>${productPrice}</p>
        </div>
    )
}
export default Product