import {Drawable} from "../Drawable";
import {Card} from "./Card";

export class Player implements Drawable{
    private holdCards: Card[]

    constructor() {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        for(let card of this.holdCards){
            card.draw(ctx)
        }
    }

    getACard(card: Card){
        this.holdCards.push(card)
    }

    giveACard(): Card{
        return null
    }


}