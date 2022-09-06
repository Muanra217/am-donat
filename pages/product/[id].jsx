import styles from '../../styles/Product.module.css'
import Image from 'next/image'

const Product = () => {
    const pizza = {
        id: 1,
        img: "/img/pizza.png",
        name: 'Pepperoni',
        desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        price: [10, 20, 30],
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} alt={pizza.name} layout="fill" objectFit="contain"/>
                </div>
            </div>
            <div className={styles.right}></div>
        </div>
    )
}

export default Product