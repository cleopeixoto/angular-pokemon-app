export interface ICard {
    name: string;
    supertype: string;
    subtypes: string[],
    types: string[],
    abilities: {
        name: string;
        text: string;
        type: string;
    }[];
    attacks: {
        name: string;
        cost: string[],
        convertedEnergyCost: number;
        damage: string;
        text: string;
    }[];
    weaknesses: {
        type: string;
        value: string;
    }[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: object;
    number: number;
    artist: string;
    rarity: string;
    images: {
        small: string;  // URL
        large: string;  // URL
    };

}