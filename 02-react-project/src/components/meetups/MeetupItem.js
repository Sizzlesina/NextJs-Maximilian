import useFavorites from "../../hooks/useFavorites";
import Card from "../ui/Card";
import styles from "./MeetupItem.module.css";

function MeetupItem({ image, title, address, description, id }) {
  const { itemIsFavorite, removeFavorite, addFavorite } = useFavorites();
  const favoriteItem = itemIsFavorite(id);

  function handleToggleFavoriteStatus() {
    if (favoriteItem) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        title,
        description,
        image,
        address,
      });
    }
  }

  return (
    <Card>
      <li className={styles.item}>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={styles.actions}>
          <button onClick={handleToggleFavoriteStatus}>
            {favoriteItem ? "Remove from Favorites" : "To Favorites"}
          </button>
        </div>
      </li>
    </Card>
  );
}

export default MeetupItem;
