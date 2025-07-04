import ActionBar from "./ActionBar/ActionBar.tsx";
import NavBar from "./NavBar/NavBar.tsx";
import "./Header.css"
import {useEffect, useRef, useState} from "react";


const Header= () =>{

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [accumulatedScrollDown, setAccumulatedScrollDown] = useState(0);
    const lastTimestamp = useRef(performance.now());


    // When user scrolls down > Hides header
    // When user scrolls up for a certain amount > Show header (accumulative)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = lastScrollY - currentScrollY;

            const now = performance.now();
            const deltaTime = (now - lastTimestamp.current) / 1000; // seconds elapsed
            lastTimestamp.current = now;


            if(accumulatedScrollDown > 3 || currentScrollY < 150){
                setShowHeader(true);
            }else{
                setShowHeader(false);
            }
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide header
                setAccumulatedScrollDown(0);
            } else setAccumulatedScrollDown(prev=> prev + scrollDifference*deltaTime);

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
                <NavBar showHeader={showHeader}/>
            </div>
        </>
    )
}
export default Header;