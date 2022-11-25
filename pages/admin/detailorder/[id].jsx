import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
// import styles from "../../../styles/Cart.module.css";
import styles from "../../../styles/DetailOrder.module.css";

const DetailOrder = ({orders}) => {
  console.log(orders.products);
  return (
    <div className={styles.container}>
      <Link href="/admin" passHref>
        <div className={styles.backButton}>
            Back
        </div>
      </Link>
      <div className={styles.customer}>
        <table className={styles.table}>
          <thead>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{orders._id}</span>
              </td>
              <td>
                <span className={styles.name}>{orders.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{orders.address}</span>
              </td>
              <td>
                <span className={styles.total}>{orders.total.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.products}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Notes</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
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
                  <span className={styles.name}>{product.title} ({product.size>0?product.size>1?"24 Pcs":"12 Pcs":"6 Pcs"})</span>
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

      </div>
    </div>
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