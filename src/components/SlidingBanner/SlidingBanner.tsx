import img1 from "../../assets/slider/slide-img1.jpg";
import img2 from "../../assets/slider/slide-img2.jpg";
import img3 from "../../assets/slider/slide-img3.jpg";
import img4 from "../../assets/slider/slide-img4.jpg";
import img5 from "../../assets/slider/slide-img5.jpg";

import "./SlidingBanner.css";
import {motion, useMotionValue} from "framer-motion";
import {useEffect, useState} from "react";

const imgs = [img1, img2, img3, img4, img5];



const SlidingBanner = () => {
    const [imgIndex, setImgIndex] = useState(1);

    const SPRING_OPTIONS = {
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
    };

    const ONE_SECOND = 1000;
    const AUTO_DELAY = ONE_SECOND * 10;
    const DRAG_BUFFER = 5;
    const dragX = useMotionValue(0);


    useEffect(() => {
        const intervalRef = setInterval(() => {
            const x = dragX.get();

            if (x === 0) {
                setImgIndex((pv) => {
                    if (pv === imgs.length - 1) {
                        return 0;
                    }
                    return pv + 1;
                });
            }
        }, AUTO_DELAY);

        return () => clearInterval(intervalRef);
    }, []);

    const onDragEnd = () => {
        const x = dragX.get();
        console.log("drag end: x value: " + x);
        if (x <= -DRAG_BUFFER) {
            if(imgIndex < imgs.length - 1) setImgIndex((pv) => pv + 1);
            else setImgIndex(0)
        } else if (x >= DRAG_BUFFER) {
            if(imgIndex > 0) setImgIndex((pv) => pv - 1);
            else setImgIndex(imgs.length -1)
        }
    }
    return (
        <>
            <div className="SlidingBannerContainer">
                <motion.div
                    className="SlidingBanner"
                    drag="x"
                    style={{x: dragX}}
                    draggable="true"
                    transition={SPRING_OPTIONS}
                    dragConstraints={{left:0, right:0}}
                    onDragEnd={onDragEnd}
                    animate={{
                        translateX: `-${imgIndex * 100}vw`,
                    }}
                >
                    {imgs.map((imgSrc, idx) => (
                        <div className="BannerContainer" key={idx}>
                            <img className="Banner" src={imgSrc} alt={`banner-${idx}`} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default SlidingBanner;