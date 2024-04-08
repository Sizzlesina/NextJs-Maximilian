// Next js imports
import Link from "next/link";
import { useSession } from "next-auth/client";
// CSS module import
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();
  console.log(loading);
  console.log(session);

  return (
    <header className={styles.header}>
      <Link href='/'>
        <div className={styles.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
