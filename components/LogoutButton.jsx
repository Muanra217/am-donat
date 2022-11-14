import styles from "../styles/Add.module.css";
import { useRouter } from "next/router";
import axios from 'axios'

const LogoutButton = () => {
  const router = useRouter();

  const handleClick = async () => {
      await axios.post("http://localhost:3000/api/logout", {
      });
      router.push("/admin");
  };

  return (
    <>
        <div onClick={() => handleClick()} className={styles.mainAddButton}>
            Logout
        </div>
    </>
  );
};

export default LogoutButton;