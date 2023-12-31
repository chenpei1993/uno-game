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

    click(x: number, y: number, func: () => void){

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
                }else{
                    this.chosenCard = card
                }
                break
            }
        }
    }
}