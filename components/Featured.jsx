import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
    const [index, setIndex] = useState(0);
    const images = [
        "/img/featured.png",
        "/img/featured2.png",
        "/img/featured3.png",
    ];
    //slider function
    const handleArrow = (direction) => {
        if (direction === "left") {
            setIndex(index > 0 ? index - 1 : 2);
        } else {
            setIndex(index < images.length - 1 ? index + 1 : 0);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleArrow("left")}>
                <Image src="/img/arrowl.png" alt="arrow" layout="fill" objectFit="contain"/>
            </div>
            <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                {images.map((image, index) => (
                    <div className={styles.imgContainer} key={index}>
                        <Image src={image} alt="featured"  layout="fill" objectFit="contain"/>
                    </div>
                ))}
            </div>
            <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("right")}>
                <Image src="/img/arrowr.png" alt="arrow" layout="fill" objectFit="contain"/>
            </div>
        </div>
    )
}

export default Featured