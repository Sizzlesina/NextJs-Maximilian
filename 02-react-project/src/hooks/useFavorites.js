import { useContext } from "react";
import { FavoritesContext } from "../store/favorites-context";

export default function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined)
    throw new Error(
      "FavoritesContext was used outside the FavoritesContextProvider"
    );
  return context;
}
