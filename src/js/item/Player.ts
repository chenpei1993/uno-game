import {Card} from "./Card";
import {BasicPlayer} from "./BasicPlayer";

export interface Player{
    getName(): string
    getACard(card: Card, player: BasicPlayer): boolean
    giveACard(): Card
    getInfoFromDeal(cards: Card[]):void
    myTurn():void
    reset(): void
}