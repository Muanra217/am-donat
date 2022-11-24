import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import styles from "../../../styles/Cart.module.css";

const DetailOrder = ({orders}) => {
  console.log(orders);
  return (
    <>
      <div className={styles.row}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                        <tr className={styles.tr}>
                            <td>
                                <span className={styles.id}>{orders._id}</span>
                            </td>
                            <td>
                                <span className={styles.name}>
                                {orders.customer}
                                </span>
                            </td>
                            <td>
                                <span className={styles.address}>{orders.address}</span>
                            </td>
                            <td>
                                <span className={styles.total}>{orders.total}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Notes</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {orders.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.notes}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {(product.price * product.quantity).toLocaleString("id-ID", {style:"currency", currency:"IDR"})}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default DetailOrder;

export const getServerSideProps = async ({params}) => {
  const orderRes = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      orders: orderRes.data,
    },
  };
}