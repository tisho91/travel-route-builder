import {Graph} from "../classes/Graph.ts";
import {GraphContext} from "./GraphContext.ts";
import {type ReactNode, useCallback, useMemo, useState} from "react";


export const GraphProvider= ({children} : {children: ReactNode}) => {
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

