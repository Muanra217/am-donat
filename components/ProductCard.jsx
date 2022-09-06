import styles from "../styles/ProductCard.module.css";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" width={500} height={500} alt="pizza"/>
      <h1 className={styles.title}>DONAT KENTANG</h1>
      <span className={styles.price}>Rp. 15.000</span>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, in!</p>
    </div>
  )
}

export default ProductCard