import {BasicPlayer} from "./BasicPlayer";
import {Card} from "./Card";
import {Dealer} from "./Dealer";

export class RightPlayer extends BasicPlayer{

    private interval: number

    constructor(width: number, height: number, dealer: Dealer) {
        super(width, height, dealer)
        this.interval = 20
    }

    draw(ctx: CanvasRenderingContext2D) {
        let card = this.holdCards[0]
        let w = (this.holdCards.length - 1) * this.interval + card.getWidth()
        let x = this.width - card.getHeight()
        let y = this.height / 2 + w / 2
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(- Math.PI * 0.5)
        for(let i = 0; i < this.holdCards.length; i++){
            let card = this.holdCards[i]
            ctx.drawImage(card.getImage(), i * this.interval, 0, card.getWidth(), card.getHeight())
        }
        ctx.restore()

    }
}