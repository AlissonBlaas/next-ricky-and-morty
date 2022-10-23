import Head from "next/head";
import Link from "next/link";

import { fetchAllCharacters } from "../hooks/fetch";

import styles from "../../styles/home.module.scss";

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

const Home = ({ characters }: ICharacters) => {
  const charactersData = characters.results;

  return (
    <div className={styles.main}>
      <Head>
        <title>RM | Homepage</title>
      </Head>
      <div className={styles.content}>
        {charactersData.map((character: TCharacter) => (
          <Link href={`character/${character.id}`} key={character.id}>
            <div className={styles.card}>
              <picture>
                <source srcSet={character.image} type="image/webp" />
                <img alt={character.name} src={character.image} />
              </picture>
              <div className="information">
                <h3>{character.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  return fetchAllCharacters();
};

export default Home;
