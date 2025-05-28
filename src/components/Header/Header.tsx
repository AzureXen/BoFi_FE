import ActionBar from "./ActionBar/ActionBar.tsx";
import NavBar from "./NavBar/NavBar.tsx";
import "./Header.css"
const Header = () =>{
    return(
        <>
            <div className="header">
                <div className={"notification"}>
                    <p className={"notification-message"}>[PROMOTION]</p>
                </div>
                <ActionBar/>
                <NavBar/>
            </div>
        </>
    )
}
export default Header;