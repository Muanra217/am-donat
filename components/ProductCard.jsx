import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`}>
        <Image src="/img/pizza.png" width={500} height={500} alt="pizza"/>
      </Link>
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>Rp. {product.prices[0]}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  )
}

export default ProductCard