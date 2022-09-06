import styles from "../styles/ProductList.module.css";
import ProductCart from "./ProductCard";

const ProductList = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>THE BEST MARKET SNACKS IN TOWN</h1>
        <p className={styles.desc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae tempora corrupti quia repellat rem alias dicta nisi voluptates hic at expedita ad quae eius quas, debitis laudantium qui recusandae maiores?
        </p>
        <div className={styles.wrapper}>
            <ProductCart/>
            <ProductCart/>
            <ProductCart/>
            <ProductCart/>
            <ProductCart/>
            <ProductCart/>
        </div>
    </div>
  )
}

export default ProductList