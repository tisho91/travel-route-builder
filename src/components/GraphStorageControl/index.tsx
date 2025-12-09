import {type ChangeEvent, useCallback, useState} from "react";
import {useGraphContext} from "../../Contexts/GraphContext.ts";
import {Graph} from "../../classes/Graph.ts";
import styles from './style.module.css'
import {AbstractNode} from "../../classes/AbstractNode.ts";


export const GraphStorageControls = () => {
    const {graph, updateGraph} = useGraphContext();
    const [name, setName] = useState<string>("");

    const saveGraph = () => {
        const serialized = graph.serialize();
        localStorage.setItem(name, serialized);
    };

    const loadGraph = () => {
        try {
            const loaded = localStorage.getItem(name);
            if (loaded) {
                updateGraph(() => Graph.deserialize(loaded));
            }
        } catch (error) {
            console.error('No graph found for name "%s"', error);
        }
    };

    const addAirport = useCallback(() => {
        return updateGraph(prev => prev.addNode(new AbstractNode({
            type: 'airport',
            data: {
                flag: '',
                label: '1',
                flagAlt: '123'
            },
            id: "rnd-id-123",
            position: {
                x: 100,
                y: 100
            }
        })))
    }, [updateGraph])


    return (
        <div className={styles.graphStorageControls} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
        }}>
            <input type={"text"} placeholder={'Save or Load graph'}/>
            <button onClick={saveGraph} className="p-2 bg-green-500 text-white rounded">
                Save Graph
            </button>
            <button onClick={loadGraph} className="p-2 bg-blue-500 text-white rounded">
                Load Graph
            </button>
            {/*    for testing purposes only*/}
            {/*<button onClick={addAirport}>
                Add Airport
            </button>*/}
        </div>
    );
};
