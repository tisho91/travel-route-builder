import {debounce} from "../../utils";
import {useMemo, useState} from "react";
import {searchCountryByName} from "../../handlers";
import styles from './styles.module.css'
import type {Country} from "../../types";
import {CountryItem} from "./Country";

export const SearchCountry = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [error, setError] = useState<string>();
    const debouncedSearch = useMemo(() =>
            debounce(async (searchWord: string) => {
                try {
                    const res = await searchCountryByName(searchWord);
                    if (!res.length) {
                        setError('No results found');
                        return;
                    } else {
                        setCountries(res);
                        setError('');
                    }
                } catch (error) {
                    console.error(error);
                    setError((error as Error).message);
                }

            }, 300)
        , []);

    return (
        <aside className={styles.searchPanel}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search country..."
                onChange={(e) => debouncedSearch(e.target.value)}
            />

            {
                error ? error : <ul className={styles.countryList}>
                    {countries?.map((country: Country) => (
                        <CountryItem key={country.name.official} {...country} />
                    ))}
                </ul>

            }

        </aside>
    )
}