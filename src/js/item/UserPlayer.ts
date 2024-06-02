import {BasicPlayer} from "./BasicPlayer";
import {Card} from "./Card";
import {Dealer} from "./Dealer";
import {RectRoundButton} from "../common/button/RectRoundButton";
import {Point} from "../common/Point";
import { UnoColorType } from "../const/UnoColorType";

export class UserPlayer extends BasicPlayer {
    choose(): UnoColorType {
        throw new Error("Method not implemented.");
    }

    private chosenCard: Card
    private chosenCardIdx: number
    private chosenHeight: number
    private interval: number
    private playButton: RectRoundButton
    private punishButton: RectRoundButton

    constructor(name: string, width: number, height: number, dealer: Dealer) {
        super(name, width, height,dealer)
        this.chosenCard = null
        this.chosenHeight = 10
        this.interval = 20
        let mid = width / 2
        let interval = 20
        this.playButton = new RectRoundButton(new Point(mid + interval, height - 100), {
            text:"出牌",
            font: "28px ",
            textColor: "black",
            width: 50,
            color: "black",
            func: () => {
                let res = this.dealer.getACard(this.chosenCard, this)
                if(res){
                    this.holdCards.splice(this.chosenCardIdx, 1)
                    this.chosenCard = null
                }
                this.uno()
            }
        })
        this.punishButton = new RectRoundButton(new Point(mid - 3 *interval, height - 100), {
            text:"惩罚",
            font: "28px ",
            textColor: "red",
            width: 50,
            color: "red",
            func: () => {
                this.getCards(this.dealer.givePunishCard())
            }
        })
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.holdCards.length > 0){
            let card = this.holdCards[0]
            let w = (this.holdCards.length - 1) * this.interval + card.getWidth()
            let x = this.width / 2 - w / 2
            let y = this.height - card.getHeight()
            for(let i = 0; i < this.holdCards.length; i++){
                let card = this.holdCards[i]
                if(this.chosenCard === card){
                    ctx.drawImage(card.getImage(), x + i * this.interval, y - this.chosenHeight, card.getWidth(), card.getHeight())
                }else{
                    ctx.drawImage(card.getImage(), x + i * this.interval, y, card.getWidth(), card.getHeight())
                }
            }
        }
        this.playButton.draw(ctx)
        this.punishButton.draw(ctx)

    }

    click(x: number, y: number){
        this.playButton.click(x, y)

        this.punishButton.click(x, y)

        for(let i = 0; i < this.holdCards.length; i++){
            let card = this.holdCards[i]
            let w = (this.holdCards.length - 1) * this.interval + card.getWidth()
            let x1 = this.width / 2 - w / 2 + i * this.interval
            let y1 = this.height - card.getHeight()

            if(this.chosenCard === card){
                y1 = y1 - this.chosenHeight
            }

            let cw = i === this.holdCards.length - 1 ? card.getWidth() : this.interval
            if(x1  < x  && x < x1 + cw
                && y1 < y && y < y1 + card.getHeight()){
                if(this.chosenCard === card){
                    this.chosenCard = null
                    this.chosenCardIdx = null
                }else{
                    this.chosenCard = card
                    this.chosenCardIdx = i
                }
                break
            }
        }
    }
}