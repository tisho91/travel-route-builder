import {Graph} from "../classes/Graph.ts";
import {GraphContext} from "./GraphContext.ts";
import * as React from "react";
import {useCallback, useMemo, useState} from "react";


export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [graphState, setGraphState] = useState(() => Graph.empty());
    const updateGraph = useCallback((updateFn: (prevGraph: Graph) => Graph) => {
        setGraphState(prev => updateFn(prev));
    }, []);



    const contextValue = useMemo(() => ({
        graph: graphState,
        updateGraph,
    }), [graphState, updateGraph]);
    return (
        <GraphContext.Provider value={contextValue}>
            {children}
        </GraphContext.Provider>
    )
}

