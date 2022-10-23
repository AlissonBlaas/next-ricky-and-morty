import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { fetchAllCharacters, TCharacter } from "../hooks/fetch";

import Card from "../components/Card";

import styles from "../../styles/home.module.scss";

type TResults = {
  results: TCharacter[];
};

interface ICharacters {
  characters: TResults;
}

const inlineStyles = {
  borderRadius: "0.2rem 0.2rem 0 0",
  overflow: "hidden",
};

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
            <div>
              <Card>
                <div style={inlineStyles}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={350}
                    height={250}
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>

                <div className={styles.information}>
                  <h3>{character.name}</h3>
                </div>
              </Card>
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
