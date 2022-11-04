import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux'
import Link from 'next/link';

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
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
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src={"/img/cart.png"} alt="logo" width="30px" height="30px"/>
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar