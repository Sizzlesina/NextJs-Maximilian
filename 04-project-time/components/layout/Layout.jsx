// Component imports
import MainHeader from "./MainHeader";
import Notification from "../ui/Notification.jsx";

// Hook imports
import useNotification from "../../hooks/useNotification.js";

function Layout({ children }) {
  // Destructing the values from context 
  const {
    showNotification,
    hideNotification,
    notification: activeNotification,
  } = useNotification();

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default Layout;
