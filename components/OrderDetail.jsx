import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder, setClose, products, setCash }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  console.log(products)
  const handleClick = () => {
    createOrder({ customer, address, total, method: 0, products });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => {setClose(true), setCash(false)}} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>You will pay {total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;