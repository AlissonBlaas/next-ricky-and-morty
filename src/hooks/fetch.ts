import { api } from "../services/api";

export type TCharacter = {
  id: number;
  image: string;
  name: string;
  location: {
    name: string;
    url: string;
  };
};

export type TAllCharacters = {
  characters: TCharacter[];
};

export const fetchAllCharacters = async () => {
  try {
    const res = await api.get("character");
    const characters: TAllCharacters = res.data;
    return { characters };
  } catch (error) {
    return { error };
  }
};

export const fetchCharacterDate = async (characterId: string | string[]) => {
  try {
    const { data } = await api.get(`/character/${characterId}`);
    const character: TCharacter = data;
    return character;
  } catch (error) {
    return { error };
  }
};
