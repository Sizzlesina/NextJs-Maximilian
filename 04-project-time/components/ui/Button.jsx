import Link from "next/link";
import styles from "./Button.module.css";

function Button({ link, children }) {
  return (
    <Link href={link}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
}

export default Button;
