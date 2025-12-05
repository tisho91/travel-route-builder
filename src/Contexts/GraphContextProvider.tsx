import {Graph} from "../classes/Graph.ts";
import {GraphContext} from "./GraphContext.ts";
import * as React from "react";


export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const graph = new Graph();

    return (
        <GraphContext.Provider value={{graph}}>
            {children}
        </GraphContext.Provider>
    )
}

