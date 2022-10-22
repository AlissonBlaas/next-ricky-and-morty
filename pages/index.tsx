import Head from "next/head";
import Image from "next/image";
import axios from "axios";

import { api } from "./services/api";

import styles from "../styles/home.module.scss";

type TCharacter = {
  id: number;
  image: string;
  name: string;
};

type TResults = {
  results: TCharacter[];
};

interface ICharacters {
  characters: TResults;
  error: string;
}

const Home = ({ characters, error }: ICharacters) => {
  const charactersData = characters.results;

  if (!characters && error) {
    return (
      <div className={styles.main}>
        <Head>
          <title>RM | ERROR</title>
        </Head>
        <h1>ERROR 404</h1>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>RM | Homepage</title>
      </Head>
      <div className={styles.content}>
        {charactersData.map((character: TCharacter) => (
          <div className={styles.card} key={character.id}>
            <picture>
              <source srcSet={character.image} type="image/webp" />
              <img alt={character.name} src={character.image} />
            </picture>
            <div className="information">
              <h3>{character.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  try {
    const res = await api.get("character");
    const characters = res.data;
    return { characters };
  } catch (error) {
    return { error };
  }
};

export default Home;
