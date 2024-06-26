// Next js imports
import Link from "next/link";

// Component imports
import Logo from "./Logo";

// CSS module import
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>

      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
