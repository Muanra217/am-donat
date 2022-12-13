import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({product}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
        <a><Image src={product.img} width={500} height={500} alt="pizza"/></a>
      </Link>
      <Link href={`/product/${product._id}`} passHref>
        <h1 className={styles.title}>{product.title}</h1>
      </Link>
      <span className={styles.price}>{product.prices[0].toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  )
}

export default ProductCard