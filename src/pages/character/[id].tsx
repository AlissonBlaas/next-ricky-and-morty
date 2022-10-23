import Head from "next/head";
import Image from "next/image";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import { TCharacter, fetchCharacterDate } from "../../hooks/fetch";

import { api } from "../../services/api";

import Card from "../../components/Card";

import styles from "./styles.module.scss";

const inlineStyles = {
  imageStyled: {
    borderRadius: "0.2rem 0.2rem 0 0",
  },
};

const Home = ({
  character,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const locationInfo = character.location;
  const originInfo = character.origin;

  console.log(character);

  return (
    <div className={styles.main}>
      <Head>
        <title>{`RM | ${character.name || "character detail"}`}</title>
      </Head>
      <div className={styles.content}>
        <Card>
          <div className={styles.imgCharacter}>
            <Image
              src={character.image}
              alt={character.name}
              width={350}
              height={350}
              style={inlineStyles.imageStyled}
            />
          </div>
          <div className={styles.cardContent}>
            <h1>{character.name}</h1>
            <div className={styles.information}>
              <div className={styles.informationTitle}>
                <h2>Character</h2>
              </div>
              <div className={styles.informationContent}>
                <h3>Gender: {character.gender}</h3>
                <h3>Status: {character.status}</h3>
                <h3>Specie: {character.species}</h3>
                <h4 className={styles.episodesStyle}>
                  Number of episodes: {character.episode.length}
                </h4>
              </div>
            </div>

            <div className={styles.information}>
              <div className={styles.informationTitle}>
                <h2>Location</h2>
              </div>
              <div className={styles.informationContent}>
                <h3>{locationInfo.name}</h3>
              </div>
            </div>
            <div className={styles.information}>
              <div className={styles.informationTitle}>
                <h2>Origin</h2>
              </div>
              <div className={styles.informationContent}>
                <h3>{originInfo.name}</h3>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const characterData = await fetchCharacterDate(params.id);

  return {
    props: { character: characterData },
  };
};

export async function getStaticPaths() {
  const { data } = await api.get("character");

  return {
    paths: data.results.map((result: TCharacter) => {
      return { params: { id: result.id.toString() } };
    }),
    fallback: true,
  };
}

export default Home;
