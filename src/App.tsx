import {SearchCountry} from "./components/SearchCountry";
import {GraphCanvas} from "./components/GraphCanvas";
import {ReactFlowProvider} from "@xyflow/react";
import {GraphProvider} from "./Contexts/GraphContextProvider.tsx";
import {GraphStorageControls} from "./components/GraphStorageControl";

export default function App() {
    return (
        <GraphProvider>
            <ReactFlowProvider>
                <div style={{display: 'flex', width: '100vw', height: '100vh'}}>
                    <GraphStorageControls/>
                    <SearchCountry/>
                    <GraphCanvas/>
                </div>
            </ReactFlowProvider>
        </GraphProvider>
    );
}