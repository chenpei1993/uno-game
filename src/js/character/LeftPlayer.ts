import {BasicPlayer} from "./BasicPlayer";
import {Card} from "./Card";
import {Dealer} from "./Dealer";
import {AI} from "../strategy/AI";
import {RobotPlayer} from "./RobotPlayer";

export class LeftPlayer extends RobotPlayer{

    constructor(name: string, width: number, height: number, dealer: Dealer, ai: AI) {
        super(name, width, height, dealer, ai)
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.holdCards.length <= 0){
            return
        }
        let card = this.holdCards[0]
        let w = (this.holdCards.length - 1) * this.interval + card.getWidth()
        let x = card.getHeight()
        let y = this.height / 2 - w / 2

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.PI / 2)
        for(let i = 0; i < this.holdCards.length; i++){
            let card = this.holdCards[i]
            ctx.drawImage(card.getBackImage(), i * this.interval, 0, card.getWidth(), card.getHeight())
        }
        ctx.restore()
    }
}