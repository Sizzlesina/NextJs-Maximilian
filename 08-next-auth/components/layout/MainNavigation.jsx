// Next js imports
import Link from "next/link";
import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";
// CSS module import
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

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
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
