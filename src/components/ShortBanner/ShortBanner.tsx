import "./ShortBanner.css"

interface IShortBanner{
    title: string,
    imgSrc: string,
}
const ShortBanner:React.FC<IShortBanner> = ({title, imgSrc}) =>{
    return(
        <div className={"short-banner"} style={{backgroundImage: `url(${imgSrc})`}}>
            <div className="banner-title">
                <h4>{title}</h4>
            </div>
        </div>
    )
}
export default ShortBanner;