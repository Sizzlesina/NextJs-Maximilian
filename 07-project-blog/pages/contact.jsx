// Next js imports
import Head from "next/head";
// Component imports
import ContactForm from "../components/contact/ContactForm";

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name='description' content='Send me your messages' />
      </Head>
      <ContactForm />;
    </>
  );
}

export default ContactPage;
