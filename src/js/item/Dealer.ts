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
import {ClockTimer} from "../common/text/ClockTimer";

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
    private timer: ClockTimer
    private players: Map<string, Player>
    private width: number
    private height: number
    private padding: number

    constructor(container: Container,pos: Point, width: number, height: number, cardWidth: number, cardHeight: number) {
        this.cardBox = new CardBox(container, cardWidth, cardHeight)
        this.cards = this.cardBox.getCards()
        ArrayUtil.shuffle(this.cards)
        this.usedCards = new Array<Card>()
        this.usedCardIdx = 0
        this.interval = 20
        this.padding = 50
        this.pos = pos
        this.width = width
        this.height = height
        this.punishCardNum = this.defaultPunishCardNum
        this.turn = 0
        this.alertManager = new AlertManager(container.getWidth() / 2)
        this.players = new Map<string, Player>()
        this.timer = new ClockTimer(new Point(this.pos.x + this.width / 2, this.pos.y + this.height - 50), 30)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        console.log(this.turn)

        if(this.turn == 0){
            let player = this.players.get("user")
            // if(this.timer)
        }else if(this.turn == 1){

        }else if(this.turn == 2){

        }else{

        }

        let x = this.pos.x + this.padding
        let y = this.pos.y + this.padding
        let start = this.usedCards.length - 10 >= 0 ? this.usedCards.length - 10 : 0
        for(let i = start; i < this.usedCards.length; i++){
            let card = this.usedCards[i]
            ctx.drawImage(card.getImage(), x + i * this.interval,
                y, card.getWidth(), card.getHeight())
        }
        this.timer.draw(ctx)
        this.alertManager.draw(ctx)
        // this.timer.draw(ctx)

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

    register(name: string, player: Player){
        this.players.set(name, player)
    }
}