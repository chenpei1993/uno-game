import {BasicPlayer} from "./BasicPlayer";
import {Card} from "./Card";

export class UserPlayer extends BasicPlayer{

    private chosenCard: Card
    private chosenHeight: number
    private interval: number

    constructor(width: number, height: number) {
        super(width, height)
        this.chosenCard = null
        this.chosenHeight = 10
        this.interval = 20
    }

    draw(ctx: CanvasRenderingContext2D) {
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
}