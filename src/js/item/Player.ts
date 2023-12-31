import {Card} from "./Card";

export interface Player{
    getACard(card: Card): void
    giveACard(): Card
}