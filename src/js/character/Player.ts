import {Card} from "./Card";
import {BasicPlayer} from "./BasicPlayer";
import {UnoColorType} from "../const/UnoColorType";
import {UnoChooseType} from "../const/UnoChooseType";

export interface Player{
    getName(): string
    getACard(card: Card, player: BasicPlayer): boolean
    giveACard(): Card
    getInfoFromDeal(cards: Card[]):void
    myTurn(type: UnoChooseType):void
    reset(): void
}