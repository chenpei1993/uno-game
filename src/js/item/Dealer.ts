import {Card} from "./Card";
import {UnoColorType} from "../const/UnoColorType";
import {UnoCardType} from "../const/UnoCardType";
import {CardBox} from "./CardBox";
import {Drawable} from "../Drawable";
import {Container} from "../Container";
import {ArrayUtil} from "../util/ArrayUtil";
import {Player} from "./Player";
import {Point} from "../common/Point";
import {AlertTag} from "../common/text/AlertTag";

export class Dealer implements Player, Drawable{

    private cardBox: CardBox
    private cards: Card[]
    private usedCards: Card[]
    private usedCardIdx: number
    private interval: number
    private pos: Point
    private alerts: AlertTag[]
    private punishCardNum: number
    private defaultPunishCardNum: number = 2

    constructor(container: Container,pos: Point, cardWidth: number, cardHeight: number) {
        this.cardBox = new CardBox(container, cardWidth, cardHeight)
        this.alerts = []
        this.cards = this.cardBox.getCards()
        ArrayUtil.shuffle(this.cards)
        this.usedCards = new Array<Card>()
        this.usedCardIdx = 0
        this.interval = 20
        this.pos = pos
        this.punishCardNum = this.defaultPunishCardNum
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let start = this.usedCards.length - 10 >= 0 ? this.usedCards.length - 10 : 0
        for(let i = start; i < this.usedCards.length; i++){
            let card = this.usedCards[i]
            ctx.drawImage(card.getImage(), this.pos.x + i * this.interval,
                this.pos.y, card.getWidth(), card.getHeight())
        }

        for(let i = 0; i < this.alerts.length; i++){
            this.alerts[i].draw(ctx)
            this.alerts[i].addTime()
        }
    }

    getACard(card: Card): boolean {
        //TODO  检查开始是否符合规则
        if(card === null){
            this.alerts.push(new AlertTag("出牌不能为空!"))
            return false
        }
        this.usedCards.push(card)
        return true
    }

    giveACard(): Card {
        let card = this.cards[this.usedCardIdx]
        this.usedCardIdx++
        return card
    }

    givePunishCard(): Card[]{
        let cards:Card[] = []
        for(let i = 0; i < this.punishCardNum; i++){
            cards.push(this.giveACard())
        }
        this.punishCardNum = this.defaultPunishCardNum
        return cards
    }
}