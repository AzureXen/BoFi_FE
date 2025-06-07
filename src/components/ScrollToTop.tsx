import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*
* What's this file?
* When we use useNavigate, the scroll does not reset back to the top.
* The point of this file is to fix that, to scroll back to the top whenever we use useNavigate.
* */

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
