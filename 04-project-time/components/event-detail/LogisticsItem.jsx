import styles from "./LogisticsItem.module.css";

function LogisticsItem({ icon, children }) {
  const Icon = icon;

  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <span className={styles.content}>{children}</span>
    </li>
  );
}

export default LogisticsItem;
