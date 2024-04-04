import styles from "./Hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src='/images/site/sina.png'
          alt='An image showing sina'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, Im Sina</h1>
      <p>I am a passionate frontend developer - currently learning Next JS 🎓</p>
    </section>
  );
}

export default Hero;
