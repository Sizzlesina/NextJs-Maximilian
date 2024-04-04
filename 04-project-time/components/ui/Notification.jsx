import useNotification from "../../hooks/useNotification";
import styles from "./Notification.module.css";

function Notification({ title, message, status }) {
  let statusClasses = "";
  const { hideNotification } = useNotification();

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  if (status === "pending") {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
