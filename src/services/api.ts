import axios from 'axios';
import { Character, Comics } from '../types';

const apiKey = import.meta.env.VITE_MARVEL_API_KEY;
const apiHash = import.meta.env.VITE_MARVEL_API_HASH;
const apiBaseUrl = 'https://gateway.marvel.com/v1/public/characters';

const fetchCharacters = async (nameStartsWith = ''): Promise<Character[]> => {
  const cacheKey = nameStartsWith
    ? `characters_${nameStartsWith}`
    : 'characters';
  const cachedData = localStorage.getItem(cacheKey);

  //This cache is only for assestment, because the api is too slow
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(apiBaseUrl, {
      params: {
        ts: 1,
        apikey: apiKey,
        hash: apiHash,
        limit: 30, //50 makes the api more slow and crash in the browser
        nameStartsWith: nameStartsWith || undefined,
      },
    });

    const { data } = response.data;
    localStorage.setItem(cacheKey, JSON.stringify(data.results));

    return data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

const fetchCharacterById = async (characterId: string | undefined): Promise<Character> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${characterId}`, {
      params: {
        ts: 1,
        apikey: apiKey,
        hash: apiHash,
      },
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

const fetchComicsByCharacterId = async (
  characterId: string | undefined,
): Promise<Comics[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${characterId}/comics`, {
      params: {
        ts: 1,
        apikey: apiKey,
        hash: apiHash,
        limit: 20,
        orderBy: 'onsaleDate',
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics:', error);
    throw error;
  }
};

const MarvelService = {
  fetchCharacters,
  fetchCharacterById,
  fetchComicsByCharacterId,
};

export default MarvelService;