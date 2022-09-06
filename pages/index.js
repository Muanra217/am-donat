import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import ProductList from '../components/ProductList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AM Donat</title>
        <meta name="description" content="Best UMKM Food in Town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      <ProductList/>
    </div>
  )
}
