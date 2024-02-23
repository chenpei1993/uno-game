import {Card} from "./Card";
import {UnoColorType} from "../const/UnoColorType";
import {UnoCardType} from "../const/UnoCardType";
import {CardBox} from "./CardBox";
import {Drawable} from "../Drawable";
import {Container} from "../Container";
import {ArrayUtil} from "../util/ArrayUtil";
import {Player} from "./Player";

export class Dealer implements Player, Drawable{

    private cardBox: CardBox
    private cards: Card[]
    private usedCards: Card[]
    private usedCardIdx: number

    constructor(container: Container, cardWidth: number, cardHeight: number) {
        this.cardBox = new CardBox(container, cardWidth, cardHeight)
        this.cards = this.cardBox.getCards()
        ArrayUtil.shuffle(this.cards)
        this.usedCards = new Array<Card>()
        this.usedCardIdx = 0
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }

    getACard(card: Card): void {
        //TODO
        this.usedCards.push(card)
    }

    giveACard(): Card {
        let card = this.cards[this.usedCardIdx]
        this.usedCardIdx++
        return card
    }
}