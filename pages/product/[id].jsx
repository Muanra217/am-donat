import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react'

const Product = () => {
    const [size, setSize] = useState(0)
    const pizza = {
        id: 1,
        img: "/img/pizza.png",
        name: 'Pepperoni',
        desc: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        price: [10000, 20000, 30000],
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} alt={pizza.name} layout="fill" objectFit="contain"/>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.name}</h1>
                <span className={styles.price}>Rp.{pizza.price[size]}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={()=>setSize(0)}>
                        <Image src="/img/size.png" alt="size1" layout='fill'/>
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={()=>setSize(1)}>
                        <Image src="/img/size.png" alt="size1" layout='fill'/>
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={()=>setSize(2)}>
                        <Image src="/img/size.png" alt="size1" layout='fill'/>
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    <div className={styles.option}>
                        <input type="checkbox" id='double' name='double' className={styles.checkbox}/>
                        <label htmlFor="double" className={styles.label}>Double Ingredients</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id='double2' name='double2' className={styles.checkbox}/>
                        <label htmlFor="double2" className={styles.label}>Double Ingredients2</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id='double3' name='double3' className={styles.checkbox}/>
                        <label htmlFor="double3" className={styles.label}>Double Ingredients3</label>
                    </div>
                    <div className={styles.option}>
                        <input type="checkbox" id='double4' name='double4' className={styles.checkbox}/>
                        <label htmlFor="double4" className={styles.label}>Double Ingredients4</label>
                    </div>
                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} className={styles.quantity}/>
                    <button className={styles.button}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product