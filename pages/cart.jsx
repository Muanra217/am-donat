import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';

const Cart = () => {
    const cart = useSelector((state)=>state.cart)
    const [open, setOpen] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    const dispatch = useDispatch()
    const router = useRouter();

    const createOrder = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/api/orders', data);
            res.status === 200 && router.push('/orders'+res.data._id);
            dispatch(reset());
        } catch (error) {
            
        }
    }

    // Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer: shipping.name.full_name, 
                            address: shipping.address.address_Line_1,
                            total: cart.total,
                            method: 1})
                    });
                }}
            />
        </>
    );
}

  return (
    <>
    <Head>
        <title>Cart</title>
    </Head>
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </tbody>
                <tbody>
                    {cart.products.map((product)=>(
                        <tr className={styles.tr} key={product._id}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image src={product.img} layout='fill' objectFit='cover' alt='pizza' />
                                </div>
                            </td>
                            <td>
                                <span className={styles.name}>{product.title}</span>
                            </td>
                            <td>
                                <span className={styles.extras}>
                                    {product.extras.map((extra)=>(
                                        <span key={extra._id}>{extra.text}, </span>
                                    ))}
                                </span>
                            </td>
                            <td>
                                <span className={styles.price}>{product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</span>
                            </td>
                            <td>
                                <span className={styles.quantity}>{product.quantity}</span>
                            </td>
                            <td>
                                <span className={styles.total}>{(product.price * product.quantity).toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>{cart.total.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>Rp.0
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>{cart.total.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}
                </div>
                {open ? (
                    <div className={styles.paymentMethods}>
                        <button className={styles.payButton}>CASH ON DELIVERY</button>
                        <PayPalScriptProvider
                            options={{
                                "client-id": "AZ6j47OuPimzTYi_6CxIfW1j_TPzfVQgRiSyxxXp8v09jzAqwRVYjIAwTq1dkl04B23lXnSWzbpKsZtL",
                                components: "buttons",
                                currency: "USD",
                                "disable-funding": "credit,card,p24",
                            }}
                        > 
                            <ButtonWrapper
                                currency={currency}
                                showSpinner={false}
                            />
                        </PayPalScriptProvider>
                    </div>
                    ) : (
                    <button className={styles.button} onClick={() => setOpen(true)} >CHECKOUT NOW!</button>
                    )
                }
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Cart