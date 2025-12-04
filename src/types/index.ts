export interface Country {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
        alt: string;
    }
}

export interface Position {
    x: number;
    y: number;
}

export interface AbstractNodeData {
    id: string;
    label: string;
    position: Position;
    type: string
}

export interface CountryNodeData extends AbstractNodeData {
    flag: string;
}

