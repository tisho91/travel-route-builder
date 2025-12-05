export interface Country {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
        alt: string;
    },
    cca3: string;
}

export interface Position {
    x: number;
    y: number;
}

export interface AbstractNodeBaseData {
    id: string;
    position: Position;
    type: string;
    label: string;
}

export interface CountryNodeSpecificData {
    flag: string,
    flagAlt: string,
}
