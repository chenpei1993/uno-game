import {Card} from "./Card";
import {UnoColorType} from "../const/UnoColorType";
import {UnoCardType} from "../const/UnoCardType";
import {CardBox} from "./CardBox";

export class Dealer{

    private cardBox: CardBox
    private cards: Card[]

    constructor() {
        this.cardBox = new CardBox()
        this.cards = this.cardBox.getCards()
    }


    shuffle(){

    }
}