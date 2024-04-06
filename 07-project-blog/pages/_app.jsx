// Next js imports
import Head from "next/head";
// CSS module import
import "../styles/globals.css";
// Component imports (Layout)
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width intial-scale=1' />
      </Head>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
