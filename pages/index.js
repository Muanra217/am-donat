import Head from 'next/head'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import AdminButton from '../components/AdminButton'
import Featured from '../components/Featured'
import ProductList from '../components/ProductList'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import LogoutButton from '../components/LogoutButton'

export default function Home({productList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>AM Donuts</title>
        <meta name="description" content="Best UMKM Food in Town" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose} />}
      {admin && <AdminButton />}
      {admin && <LogoutButton />}
      <ProductList productList={productList}/>
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: res.data,
      admin
    }
  }
}
