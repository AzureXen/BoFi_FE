import ActionBar from "./ActionBar/ActionBar.tsx";
import NavBar from "./NavBar/NavBar.tsx";
import "./Header.css"
import {useEffect, useState} from "react";
const Header = () =>{

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                // Scrolling down
                setShowHeader(false);
            } else {
                // Scrolling up
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return(
        <>
            <div className={`header ${showHeader ? "show" : "hide"}`}>
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