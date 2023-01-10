import styles from '../../styles/Product.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import dbConnect from '../../lib/mongo'
import ProductDb from '../../models/Product'

const Product = ({product}) => {
    const [price, setPrice] = useState(product.prices[0])
    const [size, setSize] = useState(0)
    // const [stocks, setStocks] = useState(product.stocks[0])
    const [notes, setNotes] = useState(null);
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex)=> {
        const difference = product.prices[sizeIndex] - product.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    }

    // const handleChange = (e,option) =>{
    //     const checked = e.target.checked;

    //     if(checked){
    //         changePrice(option.price);
    //         setExtras((prev)=>[...prev,option])
    //     } else {
    //         changePrice(-option.price);
    //         setExtras(extras.filter((extra)=>extra._id !== option._id))
    //     }
    // }

    const handleClick = async () => {
        dispatch(addProduct({...product, quantity, price, notes, size, stocks}))
    }

    return (
        <>
        <Head>
            <title>{product.title}</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={product.img} alt={product.title} layout="fill" objectFit="contain"/>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{product.title}</h1>
                <span className={styles.price}>{price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</span>
                <p className={styles.desc}>{product.desc}</p>
                <h3 className={styles.choose}>Choose the amount</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={()=>handleSize(0)}>
                        <Image src="/img/size.png" alt="size1" layout='fill'/>
                        <span className={styles.number}>6 pcs</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(1)}>
                        <Image src="/img/size.png" alt="size1" layout='fill'/>
                        <span className={styles.number}>12 pcs</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(2)}>
                        <Image src="/img/size.png" alt="size1" layout='fill'/>
                        <span className={styles.number}>24 pcs</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Stocks left</h3>
                <div className={styles.sizes}>
                    <div className={styles.size}>
                        <Image src="/img/size.png" alt="stock1" layout='fill'/>
                        <span className={styles.number}>{product.stocks[0]}</span>
                    </div>
                    <div className={styles.size}>
                        <Image src="/img/size.png" alt="stock1" layout='fill'/>
                        <span className={styles.number}>{product.stocks[1]}</span>
                    </div>
                    <div className={styles.size}>
                        <Image src="/img/size.png" alt="stock1" layout='fill'/>
                        <span className={styles.number}>{product.stocks[2]}</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Notes (Optional)</h3>
                <div className={styles.ingredients}>
                    <textarea
                        rows={8}
                        cols={56}
                        type="text"
                        placeholder='Contoh: Rasa cokelat'
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} className={styles.quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
        </>
    )
}

export const getServerSideProps = async ({params}) => {
    await dbConnect()

    const res = await ProductDb.findById(params.id)
    return {
      props: {
        product:JSON.parse(JSON.stringify(res)),
      },
    };
    // const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    // return {
    //   props: {
    //     product: res.data,
    //   }
    // }
}

export default Product