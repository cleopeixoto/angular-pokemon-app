import { ICard } from "./ICard";

export interface IDeck {
    name: string;
    cards: ICard[];
    colors: string[];
    types: string[];
}