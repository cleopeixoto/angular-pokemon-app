import { ICard } from "./ICard";

export interface IDeck {
    id: number;
    name: string;
    cards: ICard[];
}

export const deckModes = {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
}
