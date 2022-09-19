import Footer from "./Footer"
import Navbar from "./Navbar"
import Head from "next/head"

const Layout = ({children, title="AM Donuts"}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Best UMKM Food in Town" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
      </Head>
        <Navbar/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout