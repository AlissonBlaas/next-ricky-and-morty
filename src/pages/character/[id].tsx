import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import { TCharacter, fetchCharacterDate } from "../../hooks/fetch";

import { api } from "../../services/api";

import styles from "../../../styles/home.module.scss";

const Home = ({
  character,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.main}>
      <Head>
        <title>RM | Character details</title>
      </Head>
      <div className={styles.content}>
        <picture>
          <source srcSet={character.image} type="image/webp" />
          <img alt={character.name} src={character.image} />
        </picture>
        <h1>{character.name}</h1>
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
