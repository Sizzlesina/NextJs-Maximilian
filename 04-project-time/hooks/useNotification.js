import { useContext } from "react";
import { NotificationContext } from "../store/NotificationContext";

export default function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "NotificationContext was used outside the NotificationContextProvider"
    );
  }
  return context;
}
