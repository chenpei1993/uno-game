import {Card} from "../item/Card";

export interface AI{
    get(cards: Card[]): void
    play(cards: Card[]): number[]
}