import "./Location.css"
import AddressIcon from "../../assets/location/address_icon.png"
import TimeIcon from "../../assets/location/time_icon.png"
import {motion} from "framer-motion";
interface ILocation{
    title: string;
    address: string;
    workTime: string;
    onClick?: () => void;
}
const Location:React.FC<ILocation> = ({title, address, workTime, onClick}) =>{
    return(
        <motion.div
            onClick = {onClick}
            whileHover={{backgroundColor:"#f4f4f4"}}
            className={"location-page"}>
            <div className="title">
                <h4>{title}</h4>
            </div>
            <div className="detail">
                <img src={AddressIcon} alt="adress-icon" className="icon"/>
                <p>{address}</p>
            </div>
            <div className="detail">
                <img src={TimeIcon} alt="time-icon" className="icon"/>
                <p>{workTime}</p>
            </div>
        </motion.div>
    )
}
export default Location;