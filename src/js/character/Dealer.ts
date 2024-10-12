import {Card} from "./Card";
import {CardBox} from "./CardBox";
import {Drawable} from "../ui/Drawable";
import {Container} from "../Container";
import {ArrayUtil} from "../util/ArrayUtil";
import {Player} from "./Player";
import {Point} from "../ui/common/Point";
import {AlertManager} from "../ui/common/text/AlertManager";
import {ClockTimer} from "../ui/common/text/ClockTimer";
import {BasicPlayer} from "./BasicPlayer";
import {Rule} from "../rule/Rule";
import {UnoRule} from "../rule/UnoRule";
import {UnoRuleType} from "../const/UnoRuleType";
import {Panel} from "../ui/common/layout/Panel";
import {Div} from "../ui/common/layout/Div";
import {RectButton} from "../ui/common/button/RectButton";
import {TextTag} from "../ui/common/text/TextTag";
import {OrientType} from "../ui/common/layout/OrientType";
import {Clickable} from "../ui/Clickable";
import {randomColor, UnoColorType} from "../const/UnoColorType";
import {UnoChooseType} from "../const/UnoChooseType";

export class Dealer implements Player, Drawable, Clickable{

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
    private rule: Rule
    private panel: Panel
    private winnerPanel: Panel
    private curCard: Card
    private showPanel: boolean
    private gameEnd: boolean
    private container: Container
    private cardAudio: HTMLAudioElement
    private errorAudio: HTMLAudioElement

    constructor(container: Container,pos: Point, width: number, height: number, cardWidth: number, cardHeight: number) {
        this.container = container;
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
        this.rule = new UnoRule()

        this.showPanel = false
        let colors = new Div(new Point(0, 0), {orientation: OrientType.horizon});
        colors.addItem(new RectButton(null, {backgroundColor: "red", height: 100,
            func:() => {this.handleChosenColor(UnoColorType.Red)}}))
        colors.addItem(new RectButton(null, {backgroundColor: "yellow", height: 100,
            func:() => {this.handleChosenColor(UnoColorType.Yellow)}}))
        colors.addItem(new RectButton(null, {backgroundColor: "blue", height: 100,
            func:() => {this.handleChosenColor(UnoColorType.Blue)}}))
        colors.addItem(new RectButton(null, {backgroundColor: "green", height: 100,
            func:() => {this.handleChosenColor(UnoColorType.Green)}}))

        let x = container.getWidth() / 2 - colors.getWidth() / 2
        this.panel = new Panel(new Point(x, this.pos.y), {title: new TextTag(null, "请选择一个颜色", "#000", "24px serif"), body: colors})
        this.gameEnd = false
        this.winnerPanel = null
        this.cardAudio = this.container.getAudio("card")
        this.errorAudio = this.container.getAudio("error")
    }

    private createWinnerPanel(): void{
        let newGameDiv = new Div(new Point(0, 0), {orientation: OrientType.horizon});
        newGameDiv.addItem(new RectButton(null, {text: "新游戏", width: 200, height: 50, backgroundColor: "#fff",
            func:() => {this.newGame()}}))
        let x = this.container.getWidth() / 2 - newGameDiv.getWidth() / 2
        let winner = this.getCurPlayer().getName()
        this.winnerPanel = new Panel(new Point(x, this.pos.y), {title: new TextTag(null, "获胜者：" + winner,
                "#000", "24px serif", 200), body: newGameDiv})
    }

    choose(): UnoColorType {
        throw new Error("Method not implemented.");
    }

    newGame(){
        this.reset()
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
        if(this.gameEnd){
            // 赢家界面
            this.winnerPanel.draw(ctx)
            return
        }

        if(!this.timer.isLive()){
            if(this.showPanel){
                this.handleChosenColor(randomColor())
            }else{
                let player = this.players.get(this.names[this.turn])
                player.getCards(this.givePunishCard())
            }
            this.timer = this.timers[this.turn]()
        }

        let x = this.pos.x + this.padding
        let y = this.pos.y + this.padding
        let start = this.usedCards.length - 10 >= 0 ? this.usedCards.length - 10 : 0
        for(let i = start, j = 0; i < this.usedCards.length; i++, j++){
            let card = this.usedCards[i]
            ctx.drawImage(card.getImage(), x + j * this.interval,
                y, card.getWidth(), card.getHeight())
        }

        let h = y + this.getCardHeight() + 20
        ctx.fillText("当前惩罚张数： " + this.punishCardNum, x, h)
        let color = "-"
        if(this.usedCards.length > 0){
            color = this.usedCards[this.usedCards.length - 1].getColor()
        }
        ctx.fillText("当前颜色： " + color, x + 200, h)
        if(this.timer){
            this.timer.draw(ctx)
        }
        this.alertManager.draw(ctx)

        if(this.showPanel){
            this.panel.draw(ctx)
        }

    }

    getACard(card: Card, player: BasicPlayer): boolean {

        if(player != this.getCurPlayer()){
            this.alertManager.addError("当前不属于你的回合！")
            return  false
        }

        let cards = [card]
        let res = this.rule.check(cards, this.usedCards)
        this.curCard = card
        if(res == UnoRuleType.error){
            if(card){
                this.alertManager.addError("请选择符合规则的牌！")
            }
            this.errorAudio.play()
            return false
        }

        if(res ==UnoRuleType.ok){
            //检查当前选手的手牌，如果手牌为0，成代表成功
            if(player.getHoldCardNum() == 1){
                this.createWinnerPanel()
                this.gameEnd = true
            }else{
                this.nextTurn(cards)
            }
        }else if(res == UnoRuleType.reverse){
            //反转方向
            this.clockWise = !this.clockWise
            this.nextTurn(cards)
        }else if(res == UnoRuleType.addPunishCard){
            //增加惩罚的牌
            this.punishCardNum += card.getPunishNum()
            this.nextTurn(cards)
        }else if(res == UnoRuleType.skip){
            //跳过一位
            this.incrTurn()
            this.nextTurn(cards)
        }else if(res == UnoRuleType.choose){
            //展示选择颜色面板
            this.showPanel = true
            this.timer = this.timers[this.turn]()
        }else if(res == UnoRuleType.choose_punish){
            //增加惩罚的牌, 并且现实展示选择颜色面板
            this.punishCardNum += card.getPunishNum()
            this.showPanel = true
            this.timer = this.timers[this.turn]()
            this.getCurPlayer().myTurn(UnoChooseType.Color)
        }
        this.cardAudio.play()
        return true
    }

    nextTurn(cards: Card[]){
        //保存使用过的牌信息
        this.notify(cards)
        //出牌合法之后
        this.incrTurn()
        this.getCurPlayer().myTurn(UnoChooseType.Card)
        this.timer = this.timers[this.turn]()
    }

    notify(cards: Card[]){
        for(let e of this.names){
            let otherPlayer = this.players.get(e)
            otherPlayer.getInfoFromDeal(cards)
        }
        this.getInfoFromDeal(cards)

    }

    getAMessage(msg: string){
        this.alertManager.addWarning(msg)
    }

    giveACard(): Card {
        let card = this.cards[this.usedCardIdx]
        this.usedCardIdx++
        return card
    }

    givePunishCard(): Card[]{
        let cards:Card[] = []
        this.alertManager.addInfo(this.getCurPlayer().getName() + "接受惩罚: " + this.punishCardNum + "张!")
        for(let i = 0; i < this.punishCardNum; i++){
            cards.push(this.giveACard())
        }
        this.punishCardNum = this.defaultPunishCardNum
        this.incrTurn()
        this.getCurPlayer().myTurn(UnoChooseType.Card)
        this.timer = this.timers[this.turn]()
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
        ArrayUtil.shuffle(this.cards)
        this.usedCards = new Array<Card>()
        this.usedCardIdx = 0
        this.clockWise = true
        this.punishCardNum = this.defaultPunishCardNum
        this.showPanel = false
        this.gameEnd = false
    }

    private getCurPlayer():BasicPlayer{
        return this.players.get(this.names[this.turn])
    }

    private isRobotTurn(): boolean{
        let player = this.players.get(this.names[this.turn])
        return player.isRobot()
    }

    isPlayerTurn(player: Player): boolean{
        let res = this.getCurPlayer().getName() == player.getName()
        if(!res && this.showPanel){
            this.alertManager.addError("当前不是你的回合！")
            this.errorAudio.play()
        }
        return res
    }

    getInfoFromDeal(cards: Card[]): void {
        if(cards.length > 0){
            this.usedCards = this.usedCards.concat(cards)
        }
    }


    getName(): string {
        return "dealer"
    }

    myTurn(): void {
        //发牌员没有自己的回合
    }

    click(x: number, y: number): void {
        if(!this.isRobotTurn()){
            this.panel.click(x, y)
        }
        if(this.winnerPanel){
            this.winnerPanel.click(x, y)
        }
    }

    handleChosenColor(color: UnoColorType):void {
        this.curCard.setColor(color)
        this.showPanel = false
        this.nextTurn([this.curCard])
    }

    getCardWidth(){
        return this.cards[0].getWidth()
    }

    getCardHeight(){
        return this.cards[0].getHeight()
    }

}