import {SearchCountry} from "./components/SearchCountry";
import {Graph} from "./components/Graph";

export default function App() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <SearchCountry/>
            <Graph/>
        </div>
    );
}