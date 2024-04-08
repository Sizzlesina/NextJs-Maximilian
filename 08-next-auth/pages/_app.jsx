// Built-in imports
import { Provider } from "next-auth/client";
import "../styles/globals.css";
// Component imports
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </Provider>
  );
}

export default MyApp;
