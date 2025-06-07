import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import "./Contact.css"
import Location from "../../../components/Location/Location.tsx";

import Loc1 from "../../../assets/location/dirtycoins_locations/img.png";
import Loc2 from "../../../assets/location/dirtycoins_locations/img_1.png";
import Loc3 from "../../../assets/location/dirtycoins_locations/img_2.png";
import Loc4 from "../../../assets/location/dirtycoins_locations/img_3.png";
import Loc5 from "../../../assets/location/dirtycoins_locations/img_4.png";
import Loc6 from "../../../assets/location/dirtycoins_locations/img_5.png";
import Loc7 from "../../../assets/location/dirtycoins_locations/img_6.png";
import Loc8 from "../../../assets/location/dirtycoins_locations/img_7.png";
import Loc9 from "../../../assets/location/dirtycoins_locations/img_8.png";
import Loc10 from "../../../assets/location/dirtycoins_locations/img_9.png";
import Loc11 from "../../../assets/location/dirtycoins_locations/img_10.png";
import Loc12 from "../../../assets/location/dirtycoins_locations/img_11.png";
import {useState} from "react";


const Contact = () =>{

    const [displayingLoc, setDispalyingLoc] = useState(Loc1)

    // Hardcode go brrr
    const storeLocations = [
        {
            name: "DIRTYCOINS, QUẬN BÌNH TÂN, TP.HCM",
            address: "Tầng 1 TTTM Aeon Mall Bình Tân, số 1 đường số 17A, Phường Bình Trị Đông B, Quận Bình Tân, TP.HCM",
            hours: "Giờ hoạt động thứ 2 đến thứ 6 Từ 10h00 - 22h00; Thứ 7, chủ nhật và ngày lễ: 09h00 - 22h00",
            loc: Loc1,
        },
        {
            name: "DIRTYCOINS, QUẬN 10, TP.HCM",
            address: "561 Sư Vạn Hạnh, Phường 13, Quận 10, TP.HCM",
            hours: "Giờ hoạt động từ 9h00 - 22h00 cả chủ nhật và ngày lễ",
            loc: Loc2,
        },
        {
            name: "DIRTYCOINS, QUẬN 1, TP.HCM",
            address: "160 Nguyễn Cư Trinh, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
            hours: "Giờ hoạt động từ 9h00 - 22h00 cả chủ nhật và ngày lễ",
            loc: Loc3,
        },
        {
            name: "DIRTYCOINS, QUẬN 1, TP.HCM",
            address: "The New Playground 26 Lý Tự Trọng, Phường Bến Nghé. Quận 1, TP. HCM",
            hours: "Giờ hoạt động từ 9h00 - 21h30 cả chủ nhật và ngày lễ",
            loc: Loc4
        },
        {
            name: "DIRTYCOINS, QUẬN GÒ VẤP, TP.HCM",
            address: "326 Quang Trung, Phường 10. Quận Gò Vấp, TP. HCM",
            hours: "Giờ hoạt động từ 9h00 - 22h00 cả chủ nhật và ngày lễ",
            loc: Loc5
        },
        {
            name: "DIRTYCOINS, TP. THỦ ĐỨC, TP.HCM",
            address: "Tầng 2 TTTM Vincom Mega Mall Grand Park, 88 Phước Thiện, Phường Long Bình, TP. Thủ Đức, TP.HCM",
            hours: "Giờ hoạt động thứ 2 đến thứ 6 từ 10h00 - 22h00; Thứ 7, chủ nhật và ngày lễ: 09h30 - 22h00",
            loc: Loc6,
        },
        {
            name: "DIRTYCOINS, TP. BIÊN HÒA, BIÊN HÒA",
            address: "151A Phan Trung, Phường Tân Mai, TP. Biên Hòa, Biên Hòa",
            hours: "Giờ hoạt động từ 9h00 - 21h30 cả chủ nhật và ngày lễ",
            loc: Loc7,
        },
        {
            name: "DIRTYCOINS, TP. THỦ DẦU MỘT, BÌNH DƯƠNG",
            address: "28 Yersin, Phường Hiệp Thành, TP. Thủ Dầu Một, Bình Dương",
            hours: "Giờ hoạt động từ 9h00 - 21h30 cả chủ nhật và ngày lễ",
            loc: Loc8,
        },
        {
            name: "DIRTYCOINS, QUẬN NINH KIỀU, CẦN THƠ",
            address: "52 Mậu Thân, Phường An Phú, Quận Ninh Kiều, Cần Thơ",
            hours: "Giờ hoạt động thứ 2 đến thứ 5 từ 9h00 - 21h; Thứ 6,7, chủ nhật và ngày lễ từ 09h- 21h30",
            loc: Loc9,
        },
        {
            name: "DIRTYCOINS, QUẬN HÀ ĐÔNG, HÀ NỘI",
            address: "Tầng 2 TTTM Aeon Mall Hà Đông Khu dân cư Hoàng Văn Thụ, phường Dương Nội, Quận Hà Đông, Hà Nội",
            hours: "Giờ hoạt động thứ 2 đến thứ 6 Từ 10h00 - 22h00; Thứ 7, chủ nhật và ngày lễ: 09h00 - 22h00",
            loc: Loc10,
        },
        {
            name: "DIRTYCOINS, QUẬN VĂN GIANG, HƯNG YÊN",
            address: "PT.TV 136 - Mega Grand World - Ocean Park, Phường Nghĩa Trụ, Quận Văn Giang, Hưng Yên",
            hours: "Giờ hoạt động từ 9h00 - 22h00 cả chủ nhật và ngày lễ",
            loc: Loc11
        },
        {
            name: "DIRTYCOINS, QUẬN LÊ CHÂN, HẢI PHÒNG",
            address: "Tầng 2 TTTM Aeon Mall Hải Phòng Lê Chân số 10 Võ Nguyên Giáp, Phường Kênh Dương, Quận Lê Chân, Hải Phòng",
            hours: "Giờ hoạt động thứ 2 đến thứ 6 Từ 10h00 - 22h00; Thứ 7, chủ nhật và ngày lễ: 09h00 - 22h00",
            loc: Loc12,
        },
    ];


    return(
        <div>
            <Header/>

            <div className="contact-page">
                <div className={"title"}>
                    <h4>Dirty Coins has 12 showrooms nationwide</h4>
                    <h5>Select province/city</h5>
                </div>
                <div className="contact-main">
                    <div className="choose-location">
                        {storeLocations.map((location,index) => (
                            <Location
                                onClick = {()=>{
                                    setDispalyingLoc(location.loc)
                                }}
                                title={location.name} address={location.address} workTime={location.hours} key={index}/>
                        ))}
                    </div>
                    <div className="location-display-container">
                        <img className={"location-display"} src={displayingLoc} alt={"displaying-loc"}/>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
export default Contact;