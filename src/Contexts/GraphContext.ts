import {createContext, useContext} from "react";
import type {Graph} from "../classes/Graph.ts";

export const GraphContext = createContext<{
    graph: Graph,
    updateGraph: (updateFn: (prevGraph: Graph) => Graph) => void
} | null>(null);

export const useGraphContext = () => useContext(GraphContext)!;
