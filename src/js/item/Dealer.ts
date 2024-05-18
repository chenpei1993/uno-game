import {Card} from "./Card";
import {CardBox} from "./CardBox";
import {Drawable} from "../Drawable";
import {Container} from "../Container";
import {ArrayUtil} from "../util/ArrayUtil";
import {Player} from "./Player";
import {Point} from "../common/Point";
import {AlertManager} from "../common/text/AlertManager";
import {ClockTimer} from "../common/text/ClockTimer";
import {BasicPlayer} from "./BasicPlayer";
import * as console from "console";

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
    private timers: (()=>ClockTimer)[]
    private players: Map<string, BasicPlayer>
    private width: number
    private height: number
    private padding: number
    private names: string[] = ["user",  "left", "top", "right"]

    constructor(container: Container,pos: Point, width: number, height: number, cardWidth: number, cardHeight: number) {
        this.cardBox = new CardBox(container, cardWidth, cardHeight)
        this.cards = this.cardBox.getCards()
        ArrayUtil.shuffle(this.cards)
        this.usedCards = new Array<Card>()
        this.usedCardIdx = 0
        this.clockWise = true
        this.punishCardNum = this.defaultPunishCardNum

        this.interval = 20
        this.padding = 50
        this.pos = pos
        this.width = width
        this.height = height
        this.alertManager = new AlertManager(container.getWidth() / 2)
        this.players = new Map<string, BasicPlayer>()
        let defaultTime: number = 10
        this.timers = [
            () => (new ClockTimer(new Point(this.pos.x + this.width / 2, this.pos.y + this.height - 50), defaultTime)),
            () => (new ClockTimer(new Point(this.pos.x + 50, this.pos.y + this.height  / 2), defaultTime)),
            () => (new ClockTimer(new Point(this.pos.x + this.width / 2, this.pos.y + 50), defaultTime)),
            () => (new ClockTimer(new Point(this.pos.x + this.width - 50, this.pos.y + this.height  / 2), defaultTime)),
        ]
    }

    newGame(){
        for(let e of this.players.values()){
            e.reset()
        }
        for(let i = 0; i < 7; i++){
            let player = this.players.get(this.names[0])
            player.getACard(this.giveACard())
            player = this.players.get(this.names[1])
            player.getACard(this.giveACard())
            player = this.players.get(this.names[2])
            player.getACard(this.giveACard())
            player = this.players.get(this.names[3])
            player.getACard(this.giveACard())
        }
        this.turn = 0
        this.timer = this.timers[this.turn]()
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if(!this.timer.isLive()){
            let player = this.players.get(this.names[this.turn])
            player.getCards(this.givePunishCard())
            this.timer = this.timers[this.turn]()
        }

        let x = this.pos.x + this.padding
        let y = this.pos.y + this.padding
        let start = this.usedCards.length - 10 >= 0 ? this.usedCards.length - 10 : 0
        for(let i = start; i < this.usedCards.length; i++){
            let card = this.usedCards[i]
            ctx.drawImage(card.getImage(), x + i * this.interval,
                y, card.getWidth(), card.getHeight())
        }
        if(this.timer){
            this.timer.draw(ctx)
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

    register(name: string, player: BasicPlayer){
        this.players.set(name, player)
    }

    reset(): void {
    }
}