import useNotification from "../../hooks/useNotification";
import styles from "./CommentList.module.css";

function CommentList({ items }) {
  const { loading } = useNotification();

  // Show loading when data is not shown
  if (loading) {
    return <div className='center'>Loading...</div>;
  }

  return (
    <ul className={styles.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
