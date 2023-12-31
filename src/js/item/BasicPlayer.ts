import {Drawable} from "../Drawable";
import {Card} from "./Card";
import {Player} from "./Player";

export class BasicPlayer implements Drawable, Player{
    protected holdCards: Card[]
    protected width: number
    protected height: number
    constructor(width: number, height: number) {
        this.holdCards = new Array<Card>()
        this.width = width
        this.height = height
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("unsupported func")
    }

    getACard(card: Card){
        this.holdCards.push(card)
    }

    giveACard(): Card{
        return null
    }


}