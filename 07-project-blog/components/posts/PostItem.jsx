// Next js imports
import Link from "next/link";
import Image from "next/image";

// Hook and Helper imports
import { formatDate } from "../../helpers/utils";

// CSS module import
import styles from "./PostItem.module.css";

function PostItem({ post }) {
  // Formating the date to a human readable format
  const formattedDate = formatDate(post.date);
  // Dynamic image path
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <li className={styles.post}>
      <Link>
        <a>
          <div className={styles.image}>
            <Image src={imagePath} alt={title} width={300} height={200} />
          </div>
          <div className={styles.content}>
            <h3>{post.title}</h3>
            <time>{formattedDate}</time>
            <p>[post.excert]</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
