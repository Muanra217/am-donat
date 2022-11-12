import styles from "../styles/Add.module.css";
import Link from 'next/link';

const AdminButton = () => {
  return (
    <>
        <Link href="/admin" passHref>
            <div className={styles.mainAddButton}>
                Dashboard
            </div>
        </Link>
    </>
    
  );
};

export default AdminButton;