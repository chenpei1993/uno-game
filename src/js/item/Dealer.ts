import {Card} from "./Card";
import {CardBox} from "./CardBox";
import {Drawable} from "../Drawable";
import {Container} from "../Container";
import {ArrayUtil} from "../util/ArrayUtil";
import {Player} from "./Player";
import {Point} from "../common/Point";
import {AlertTag} from "../common/text/AlertTag";
import {CircleButton} from "../common/button/CircleButton";
import {System} from "../System";
import {AlertManager} from "../common/text/AlertManager";

export class Dealer implements Player, Drawable{

    private cardBox: CardBox
    private cards: Card[]
    private usedCards: Card[]
    private usedCardIdx: number
    private interval: number
    private pos: Point
    private punishCardNum: number
    private defaultPunishCardNum: number = 1
    private clockWise: boolean
    private turn: number
    private alertManager: AlertManager


    constructor(container: Container,pos: Point, cardWidth: number, cardHeight: number) {
        this.cardBox = new CardBox(container, cardWidth, cardHeight)
        this.cards = this.cardBox.getCards()
        ArrayUtil.shuffle(this.cards)
        this.usedCards = new Array<Card>()
        this.usedCardIdx = 0
        this.interval = 20
        this.pos = pos
        this.punishCardNum = this.defaultPunishCardNum
        this.turn = 0
        this.alertManager = new AlertManager(container.getWidth() / 2)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        console.log(this.turn)

        if(this.turn == 0){

            // if(this.timer)
            // new CircleButton()
        }else if(this.turn == 1){

        }else if(this.turn == 2){

        }else{

        }

        let start = this.usedCards.length - 10 >= 0 ? this.usedCards.length - 10 : 0
        for(let i = start; i < this.usedCards.length; i++){
            let card = this.usedCards[i]
            ctx.drawImage(card.getImage(), this.pos.x + i * this.interval,
                this.pos.y, card.getWidth(), card.getHeight())
        }

        this.alertManager.draw(ctx)

    }

    getACard(card: Card): boolean {
        //TODO  检查开始是否符合规则
        if(card === null){
            this.alertManager.addError("请选择一张牌！")
            return false
        }
        this.usedCards.push(card)
        this.incrTurn()
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
        this.incrTurn()
        return cards
    }

    incrTurn(){
        if(this.clockWise){
            this.turn = (this.turn + 1) % 4
        }else{
            this.turn = (this.turn + 4 - 1) % 4
        }
    }
}