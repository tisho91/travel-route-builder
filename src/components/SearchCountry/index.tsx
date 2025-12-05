import {debounce} from "../../utils";
import {useMemo, useRef, useState} from "react";
import {searchCountryByName} from "../../handlers";
import styles from './styles.module.css'
import type {Country} from "../../types";
import {CountryItem} from "./Country";
import {useGraphFlow} from "../../hooks/useGraphFlow.ts";

export const SearchCountry = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const {nodes} = useGraphFlow(ref)
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


    const filteredCountries = useMemo(() => {
        console.log(nodes)
        return countries.filter(country => {
            return !nodes.some(node => node.id === country.cca3)
        })
    }, [nodes, countries]);

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
                    {filteredCountries?.map((country: Country) => (
                        <CountryItem key={country.cca3} {...country} />
                    ))}
                </ul>

            }

        </aside>
    )
}