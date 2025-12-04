import type {Country} from "../types";

export const searchCountryByName = async (searchWord: string): Promise<Country[]> => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchWord}?fields=name,flags`);
        return await response.json();
    } catch (error) {
        throw new Error((error as Error).message);
    }

}