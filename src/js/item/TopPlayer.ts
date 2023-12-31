import {BasicPlayer} from "./BasicPlayer";
import {Card} from "./Card";

export class TopPlayer extends BasicPlayer{
    private interval: number
    constructor(width: number, height: number) {
        super(width, height)
        this.interval = 20
    }

    draw(ctx: CanvasRenderingContext2D) {
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