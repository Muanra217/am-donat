import styles from "../styles/Add.module.css";
import Link from 'next/link';
import handler from "../pages/api/logout";
import { useRouter } from "next/router";
import { useState } from "react";

const LogoutButton = () => {
  return (
    <>
        <Link href="/" passHref>
            <div onClick={() => handler} className={styles.mainAddButton}>
                Logout
            </div>
        </Link>
    </>
    
  );
};

export default LogoutButton;