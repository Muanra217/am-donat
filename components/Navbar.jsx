import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux'
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react'

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const [cart, setCart] = useState(styles.cart)
  // const getCookie = (cookieName) => {
  //   let cookie = {};
  //   document.cookie.split(';').forEach(function(el) {
  //     let [key,value] = el.split('=');
  //     cookie[key.trim()] = value;
  //   })
  //   return cookie[cookieName];
  // }
  useEffect(() => {if(getCookie('token') !== process.env.TOKEN){
    setCart(styles.cartNone)
  } else {
    setCart(styles.cart)
  }}, [])

  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <div className={styles.item}>
          <div className={styles.logo}>
            <Image src={"/img/logo.png"} alt="logo" width={240} height={80}/>
          </div>
        </div>
      </Link>
      {/* <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src={"/img/logo.png"} alt="logo" width="160px" height="69px"/>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div> */}
          <div className={styles.item}>
            <Link href="/cart" passHref>
              <div className={cart}>
                <Image src={"/img/cart.png"} alt="logo" width="30px" height="30px"/>
              <div className={styles.counter}>{quantity}</div>
              </div>
            </Link>
          </div>
    </div>
  )
}

export default Navbar