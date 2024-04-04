import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export default function NotificationContextProvider({ children }) {
  // Set the notification
  const [activeNotification, setActiveNotification] = useState();

  // Disappear the notification automatically
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      // Set the timeout conditionally
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      // Clear function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}
