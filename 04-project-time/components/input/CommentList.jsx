import styles from "./CommentList.module.css";

function CommentList({ items }) {
  return (
    <ul className={styles.comments}>
      {items.map((item) => (
        <li key={item.id}>
          <p>{item.comment}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
