import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Edit from "../../components/Edit";
import { useSelector } from "react-redux";
import Link from "next/link";

const Index = ({ orders, products}) => {
  const cart = useSelector((state) => state.cart);
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const status = ["preparing", "on the way", "delivered"];
 console.log(cart.products);
  const handleDelete = async (id) => {
    console.log(id);
    if (window.confirm("Yakin ingin menghapus produk?")) {
      try {
        const res = await axios.delete(
          "http://localhost:3000/api/products/" + id
        );
        setProductList(productList.filter((product) => product._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.idOrder}>Image</th>
              <th className={styles.idOrder}>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr>
                <td className={styles.idOrder}>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td className={styles.idOrder}>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>{product.prices[0].toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</td>
                <td>
                  <button 
                  products={products}
                  className={styles.button}
                  onClick={() => {setClose(false); handleEdit(product._id)}}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {!close && <Edit setClose={setClose} />}
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.idOrder}>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr>
              <Link href={`/admin/detailorder/${order._id}`} passHref>
                <td className={styles.idOrder}>{order._id.slice(0, 5)}...</td>
              </Link>
                <td>{order.customer}</td>
                <td>{order.total.toLocaleString("id-ID", {style:"currency", currency:"IDR"})}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
    </>
    
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;