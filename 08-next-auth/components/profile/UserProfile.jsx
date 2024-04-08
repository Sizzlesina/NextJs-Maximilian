// Component imports
import ProfileForm from "./ProfileForm";
// CSS module import
import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
