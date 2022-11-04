import styles from '../styles/Footer.module.css'
import Image from 'next/image'
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
          <Image src="/img/amdonat_stan.jpeg" objectFit='cover' layout='fill' alt="footerBG" priority/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>AM DONUTS UENAK</h2>
          <h3 className={styles.motto}>Murah & Meriah</h3>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR STALL</h1>
          <p className={styles.text}>
            Jalan Belakang Pasar Kerek
            <br /> Dusun Sumbermulyo, Margomulyo, 
            <br /> Kec. Kerek,
            <br /> Kabupaten Tuban, Jawa Timur
            <br /> 0857 1109 7085
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 10:00 - 17:00
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer