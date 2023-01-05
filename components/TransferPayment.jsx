import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";
import Link from "next/link";

const TransferPayment = ({ total, createOrder, setClose, products, setTransfer }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  console.log(products)
  const handleClick = () => {
    createOrder({ customer, address, total, method: 1, products });
  };

  const checkPay = () => {
    const el = document.getElementById('pay');
    if (!Object.values(el.classList).some(function(x) {return x == 'isClicked'})) {
      alert('Silahkan Bayar Terlebih Dahulu');
    }
    else {
      handleClick();
    }
  }

  const addClassPayed = () => {
    const el = document.getElementById('pay');
    el.classList.add('isClicked');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => {setClose(true), setTransfer(false)}} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>You will pay {total}.</h1>
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
        <a href={`https://app.sandbox.midtrans.com/payment-links/1671009522931`} rel="noreferrer" target={"_blank"} className={styles.payLink}>
            <button className={styles.payButton} id="pay" onClick={addClassPayed}>
                Transfer Pay
            </button>
        </a>
        <button className={styles.button} onClick={checkPay}>
          Order
        </button>
      </div>
    </div>
  );
};

export default TransferPayment;