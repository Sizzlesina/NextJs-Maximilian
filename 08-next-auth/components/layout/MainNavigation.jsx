// Next js imports
import Link from "next/link";
// CSS module import
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/auth'>Login</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
