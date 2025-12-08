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


export type BlockedRoute = { from: string; to: string };


export interface EdgeDetails {
    source: string;
    target: string;
}

export type NodeType = 'country' | 'hotel' | 'airport'