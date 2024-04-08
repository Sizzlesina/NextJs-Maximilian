// Next js imports
import { useSession, getSession } from "next-auth/client";
// Component imports
import ProfileForm from "./ProfileForm";
// CSS module import
import styles from "./UserProfile.module.css";
import { useEffect, useState } from "react";

function UserProfile() {
  // Redirect away if NOT auth
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p className={styles.profile}>Loading...</p>;
  }
  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
