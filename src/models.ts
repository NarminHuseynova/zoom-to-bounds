export type IData = {
    population: number;
    neighborhood: string;
    id: number;
    features: ({
        geometry: {
            type: string;
            coordinates: number[][][];
        };
        id: string;
        properties: {
            id: number;
            neighborhood: string;
            population: number;
        };
        type: string;
    } | {
        geometry: {
            type: string;
            coordinates: number[][][];
        };
        id: string;
        properties: {
        
        };
        type: string;
    })[];
}