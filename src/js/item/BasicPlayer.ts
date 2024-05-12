import {Drawable} from "../Drawable";
import {Card} from "./Card";
import {Player} from "./Player";
import {Clickable} from "../Clickable";
import {Dealer} from "./Dealer";

export class BasicPlayer implements Drawable, Clickable, Player{
    protected dealer: Dealer
    protected holdCards: Card[]
    protected width: number
    protected height: number
    constructor(width: number, height: number, dealer: Dealer) {
        this.holdCards = new Array<Card>()
        this.width = width
        this.height = height
        this.dealer = dealer
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

    click(x: number, y: number, func: () => void){
        throw new Error("unsupported func")
    }


}