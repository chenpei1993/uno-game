import {Card} from "./Card";

export interface Player{
    getACard(card: Card): boolean
    giveACard(): Card
    reset(): void
}