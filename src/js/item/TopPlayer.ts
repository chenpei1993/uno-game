import {BasicPlayer} from "./BasicPlayer";
import {Card} from "./Card";
import {Dealer} from "./Dealer";
import {AI} from "../strategy/AI";
import {SimpleAI} from "../strategy/SimpleAI";
import {RobotPlayer} from "./RobotPlayer";

export class TopPlayer extends RobotPlayer{
    private interval: number

    constructor(name: string, width: number, height: number, dealer: Dealer, ai: AI) {
        super(name, width, height, dealer, ai)
        this.interval = 20
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.holdCards.length <= 0){
            return
        }
        let card = this.holdCards[0]
        let w = (this.holdCards.length - 1) * this.interval + card.getWidth()
        let x = this.width / 2 + w / 2
        let y = card.getHeight()
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(- Math.PI)
        for(let i = 0; i < this.holdCards.length; i++){
            let card = this.holdCards[i]
            ctx.drawImage(card.getImage(), i * this.interval, 0, card.getWidth(), card.getHeight())
        }
        ctx.restore()
    }
}