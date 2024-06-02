import {Card} from "../item/Card";
import {UnoColorType} from "../const/UnoColorType";

export interface AI{
    get(cards: Card[]): void
    play(cards: Card[]): number[]
    choose(cards: Card[]): UnoColorType
}