import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({productList}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>THE BEST MARKET SNACKS IN TOWN</h1>
        <p className={styles.desc}>
            Temukan berbagai macam jajanan - jajanan pasar dengan harga terjangkau dan sehat juga enak! Dijual Lusinan dengan harga serba Rp.2500 untuk satu produknya! Yuk, beli sekarang juga!
        </p>
        <div className={styles.wrapper}>
            {productList.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default ProductList