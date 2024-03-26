import MeetupList from "../components/meetups/MeetupList";
import useFavorites from "../hooks/useFavorites";

function FavoritesPage() {
  const { favorites } = useFavorites();

  let content;

  if (favorites.length === 0) {
    content = <p>You have no favorites yet. Start adding some?</p>;
  } else {
    content = <MeetupList meetups={favorites} />;
  }
  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
