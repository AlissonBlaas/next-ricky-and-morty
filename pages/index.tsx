import styles from "../styles/home.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>donenews | inicio</title>
      </Head>
      <h1>hello world</h1>
    </div>
  );
}
